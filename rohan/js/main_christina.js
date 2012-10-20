// Declare a variable 'delicious' as the main array to store Delicious json data
var delicious = [];
// Declare a variable 'trailList' to store list of trails
var trailList = [];
// Counter for number of total steps in the trail
var totalSteps = 0;
// Counter to track the current step to be displayed
var currentStep = 1;
// Variable to track current trail
var currentTrail;
// Variable for initial tag holding
// var tags = [];

// Make img tags clickable

$('.tagItem a').live('click', function(event) {		 
		
		var data_id = $(this).attr("data-id");
		$('<div class="tag-zone" id="' + data_id + '"><h3 class="tagzonename">#' + data_id + '</h3></div>') 
		.appendTo('#content-right');
		
			
});


$('img').live('click',function(event){
var setid = $(this).attr('id');
var type = $(this).attr('type');
});

/*http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)*/
$('a').live('click',function(event){
var setid = $(this).attr('id');
var type = $(this).attr('type');

// variables assigned to the tag-zone divs and each individual image
var $trash = $( ".tag-zone" );
	$trashItem = $( ".scroll-content li");

// Function for when the images are added to the tag-zone
function deleteImage( $item, $dest ) {
         
                var $list = $( "ul", $dest ).length ?
                    $( "ul", $dest ) :
                    $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $dest );
				if($list.find('li[data-id="' + $item.data("id") + '"]').length > 0) {
					return False
				}
				var $clone = $item.clone();
				$clone.removeClass("ui-beingdragged")
					.appendTo( $list ).hide().fadeIn(function() {
                    $clone
						.animate( {width: "40px", height: "40px" })
						.find( "div" )
						.animate({ width: "40px", height: "40px" })
                        .find( "img" )
						.animate({ width: "40px", height: "40px" })
                });
        }

$(function() {

		// let the buckets be droppable, accepting the gallery items
        $trash.droppable({
            //accept: ".scroll-content li",
			accept: function($item) {
           		return ($item.parent().hasClass("gallery") && $(this).find('li[data-id="'+$item.data("id")+'"]').length <= 0);
       		},
            activeClass: "ui-state-highlight",
            drop: function( event, ui ) {
                deleteImage( ui.draggable, $(this) )
            }
        });
		
		
});

alert("type alert");
if(type == "set")
{

$('.scroll-content').empty();
$('<ul class="gallery"></ul>').appendTo('.scroll-content');

var url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=69ec61b6e4a407a91eb6946b224cb0e1&photoset_id="+setid+"&format=json&nojsoncallback=1";

$.getJSON(url,function(data,status){

alert(data.stat);
var pics = data.photoset.photo;
var imgurl;
// alert(pics.length);
for (var i = 0; i < pics.length; i++) {

		imgurl = "http://farm"+pics[i].farm+".staticflickr.com/"+pics[i].server+"/"+pics[i].id+"_"+pics[i].secret+".jpg";
		console.log("click"+imgurl);
		$('<li data-id="' + i + '"><div id="'+i+'" class="scroll-content-item ui-widget-header"><img src="'+imgurl+'" height="80" width="80"></div></li>')	
		.appendTo('.scroll-content ul')
		// lets the gallery item be draggable
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
	//alert(tag);
	var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=69ec61b6e4a407a91eb6946b224cb0e1&tag='+tag+'&format=json&nojsoncallback=1';
	$.getJSON(flickurl,function(data,status){
		//alert(data.stat);
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
	//	console.log(data);
		
	});	

	return false;
	});	

	//get sets of a user 
	$('#getsets').click(function(event){
		$('#sets ul').empty();
	
		var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=69ec61b6e4a407a91eb6946b224cb0e1&user_id=18727743@N00&format=json&nojsoncallback=1';
	var x = $.getJSON(flickurl,function(data,status){

	
	
		var x = data.photosets.photoset;
		if(x.length>8){
			var limit = 10;
		}
		else
		{
			limit = x.length;
		}

/*http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg (formula for flickr url images)
<div class = "trailItem" id="' + x[i].id + '" primary="'+x[i].primary+'" server="'+x[i].server+'" farm="'+x[i].farm+'" secret = "'+x[i].secret+'" photos="'+x[i].photos+'">
		 <a href="#" id="' + x[i].id + '">' + x[i].title._content + '</a></div>	*/

		for (var i = 0; i < limit; i++) {
		//var imgurl = 'http://farm'+x[i].farm+'.staticflickr.com/'+x[i].server+'/'+x[i].id+'_'+x[i].secret';
		var imgstr = "http://farm"+x[i].farm+".staticflickr.com/"+x[i].server+"/"+x[i].primary+"_"+x[i].secret+".jpg";	
		var isImgInDiv = $('.trailItem > a > img[src="' + imgstr+ '"]').length
		console.log($('trailItem img'))

        alert(isImgInDiv)
       	if( isImgInDiv > 0 ) {
        	alert("Image already in div");
		}
		else {
			$('<li></li>').html('<div class = "trailItem" id="' + x[i].title._content + '"><a><img src="'+imgstr+'" height="100" width="100" style=""></a><a href="#" id='+x[i].id+' type="set"><div id="davidbutton">'+x[i].title._content +'</div></a></div>') 
			.appendTo('#sets ul');
		}
		};
	});	

	console.log(x);
	return false;
	});	
	
	
	
	
	
        return false;
    });
	
