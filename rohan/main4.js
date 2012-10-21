
		$photo = $( ".scroll-content li");

function addToZone( $item, $dest ) {
        var $list = $( "ul", $dest ).length ?
         	$( "ul", $dest ) :
			// Add the draggable photo into the destination that it's dropped into
            $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $dest );
				if($list.find('li[data-id="' + $item.data("id") + '"]').length > 0) {
					return False
				}
				// This will create a clone of the image that's being dragged
				var $clone = $item.clone();
				$clone.removeClass("ui-beingdragged")
					.appendTo( $list ).hide().fadeIn(function() {
                    $clone
						.animate( {width: "40px", height: "40px" })
						.find("div")
						.animate({ width: "40px", height: "40px" })
                        .find("img")
						.animate({ width: "40px", height: "40px" })
                });
			}

// This function will handle the tag-zones accepting photos


// img tags are clickable
$('img').live('click',function(event){
	var setid = $(this).attr('id');
	var type = $(this).attr('type');
});

/*http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)*/
$('a').live('click',function(event){
	
	var setid = $(this).attr('id');
	var type = $(this).attr('type');

// variables assigned to the tag-zone divs and each individual image
alert("type is "+type);	

// Function for when the images are added to the tag-zone
/* Source Code partially added from jQuery Photo Manager demo: 
	http://jqueryui.com/droppable/#photo-manager 
	imgurl = "http://farm"+pics[i].farm+".staticflickr.com/"+pics[i].server+"/"+pics[i].id+"_"+pics[i].secret+".jpg"; static url for a flickr image
	*/
if(type=="photo")
{

var phid = $(this).attr('id');
var urlphoto = "http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2a543b41a8b72358e2225ac45f9957e4&photo_id="+phid+"&format=json&nojsoncallback=1";
console.log(urlphoto);
	$.getJSON(urlphoto,function(data,status) {

	$('#content-right-galleryimg').empty();

	$('#content-right-gallerytag ul').empty();
	console.log(data);

	var picurl = "http://farm"+data.photo.farm+".staticflickr.com/"+data.photo.server+"/"+data.photo.id+"_"+data.photo.secret+".jpg";
	console.log("picurl"+picurl);
	$('<div></div>').html('<img src="'+picurl+'" height="400" width="400">').appendTo('#content-right-galleryimg');
	
	var pictags= data.photo.tags.tag;
	console.log(pictags);
	alert(pictags.length);
	for(i = 0;i<pictags.length;i++)
	{
		alert(pictags.length);

	$('<li></li>').html('<div class = "tagItem"> <a href="#" class= "uibutton"># '+ pictags[i]._content +'</a></div>') 
		.appendTo('#content-right-gallerytag ul');	

	/*$('<li></li>').html('<div class = "tagItem"> <a href="#" data-id="' + x[i]._content + '"class= "uibutton"># '+ x[i]._content +'</a></div>') 
		.appendTo('#tag-finder ul');*/

	}
	
	//var comments = data.photo.comments;<TEXTAREA NAME="comments" COLS=30 ROWS=6></TEXTAREA>


});
} //if ends




if(type == "set") {
	// Delete all of the contents inside the container that WILL hold the photos
	$('.scroll-content').empty();
	// Insert an unordered list to the photo-holder container
	$('<ul class="gallery"></ul>').appendTo('.scroll-content');
	
	var url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=69ec61b6e4a407a91eb6946b224cb0e1&photoset_id="+setid+"&format=json&nojsoncallback=1";

	$.getJSON(url,function(data,status) {
	console.log(data);
	alert(data.stat);
	var pics = data.photoset.photo;
	var imgurl;
	// Generate the photos from each set
	for (var i = 0; i < pics.length; i++) {

		imgurl = "http://farm"+pics[i].farm+".staticflickr.com/"+pics[i].server+"/"+pics[i].id+"_"+pics[i].secret+".jpg";
		console.log("click"+imgurl);
		// Create a list item with an image from the set
		$('<li data-id="' + i + '"><div id="'+i+'" class="scroll-content-item"><a type="photo" id="'+pics[i].id+'" src="#"><img src="'+imgurl+'" height="80" width="80"></a></div></li>')	
			.appendTo('.scroll-content ul')
			// lets the gallery item be draggable
			/* Source Code partially added from jQuery Photo Manager demo: 
			http://jqueryui.com/droppable/#photo-manager */
			.draggable({
            	cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            	revert: "invalid", // when not dropped, the item will revert back to its initial position
            	containment: "document",
            	helper: "clone",
            	cursor: "move",
				start: function() {
					$(this).addClass("ui-being-dragged");
				},
				stop: function() {
					$(this).removeClass("ui-being-dragged"); 
				}
        	})
		}

	});
}

return false;
});

$(document).ready(function() {
	
    //get suggestive tags
	$('#gettags').click(function(event){
	$('#tag-finder ul').empty();
	var tag = $('#tag').val();
	var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=69ec61b6e4a407a91eb6946b224cb0e1&tag='+tag+'&format=json&nojsoncallback=1';
	$.getJSON(flickurl,function(data,status){
		var x = data.tags.tag;
		
		if(x.length>8){
			var limit = 10;
		}
		else
		{
			limit = x.length;
		}
		
		for (var i = 0; i < limit; i++) {
		// slice out the "tags:" portion of each tag
		$('<li></li>').html('<div class = "tagItem"> <a href="#" data-id="' + x[i]._content + '"class= "uibutton"># '+ x[i]._content +'</a></div>') 
		.appendTo('#tag-finder ul');				
		};
		
	});	

	return false;
	});	

	//get sets of a user 
	$('#getsets').click(function(event){
		$('#sets ul').empty();
		
		var userid = "88032686@N06";
		var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=69ec61b6e4a407a91eb6946b224cb0e1&user_id='+userid+'&format=json&nojsoncallback=1';
		var x = $.getJSON(flickurl,function(data,status){

		var x = data.photosets.photoset;
		if(x.length>8){
			var limit = 10;
		}
		else
		{
			limit = x.length;
		}

		// http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)

		for (var i = 0; i < limit; i++) {
		//var imgurl = 'http://farm'+x[i].farm+'.staticflickr.com/'+x[i].server+'/'+x[i].id+'_'+x[i].secret';
		var imgstr = "http://farm"+x[i].farm+".staticflickr.com/"+x[i].server+"/"+x[i].primary+"_"+x[i].secret+".jpg";	
		
		$('<li></li>').html('<div class = "albumSet" id="' + x[i].title._content + '"><a><img src="'+imgstr+'" height="100" width="100" style=""></a><a href="#" id='+x[i].id+' type="set"><div id="davidbutton">'+x[i].title._content +'</div></a></div>') 
			.appendTo('#sets ul');
		};
	});	

		console.log(x);
		return false;
	});	
	
	return false;
});
	