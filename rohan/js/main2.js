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
		alert("monkey business");
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

var $trash = $( ".tag-zone" );
	$trashItem = $( ".scroll-content-item");

function deleteImage( $item ) {
            $item.fadeOut(function() {
                var $list = $( "ul", $trash ).length ?
                    $( "ul", $trash ) :
                    $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
 
                $item.find( "a.ui-icon-trash" ).remove();
                $item.appendTo( $list ).fadeIn(function() {
                    $item
						.animate( {width: "40px", height: "40px" })
                        .find( "img" )
						.animate({ width: "40px", height: "40px" })
                });
            });
        }

$(function() {

		// let the trash be droppable, accepting the gallery items
        $trash.droppable({
            accept: ".scroll-content > div",
            activeClass: "ui-state-highlight",
            drop: function( event, ui ) {
                deleteImage( ui.draggable );
            }
        });
		
		$trashItem.draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        });
		
});

alert("type alert");
if(type == "set")
{

$('.scroll-content').empty();

var url = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=69ec61b6e4a407a91eb6946b224cb0e1&photoset_id="+setid+"&format=json&nojsoncallback=1";

$.getJSON(url,function(data,status){

alert(data.stat);
var pics = data.photoset.photo;
var imgurl;
alert(pics.length);
for (var i = 0; i < pics.length; i++) {

		imgurl = "http://farm"+pics[i].farm+".staticflickr.com/"+pics[i].server+"/"+pics[i].id+"_"+pics[i].secret+".jpg";
		console.log("click"+imgurl);
		$('<div id="'+i+'" class="scroll-content-item ui-widget-header"><img src="'+imgurl+'" height="80" width="80"></div>')	
		.appendTo('.scroll-content')
		.draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move"
        })
		.droppable({
            accept: ".scroll-content-item",
            activeClass: "custom-state-active",
            drop: function( event, ui ) {
                recycleImage( ui.draggable );
            }
        });
	}

});


}
return false;
});

//Try make tag_getter respond on return [David]
$("#tag_getter").live('keypress',function() {
  alert("Handler for .keypress() called.");
});


$(document).ready(function() {
    //get suggestive tags
	$('#gettags').click(function(event){
	
	$('#tag-finder ul').empty();
	var tag = $('#tag').val();
	alert(tag);
	var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=69ec61b6e4a407a91eb6946b224cb0e1&tag='+tag+'&format=json&nojsoncallback=1';
	$.getJSON(flickurl,function(data,status){
		alert(data.stat);
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
		console.log(data);
		
	});	

	return false;
	});	

	//get sets of a user 
	$('#getsets').click(function(event){
		$('#sets ul').empty();
	
		var flickurl = 	'http://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=69ec61b6e4a407a91eb6946b224cb0e1&user_id=18727743@N00&format=json&nojsoncallback=1';
	var x = $.getJSON(flickurl,function(data,status){
//		alert("callback");
		alert(data.stat);
	//	alert("rohan");
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

		console.log(imgstr);

		$('<li></li>').html('<div class = "trailItem" id="' + x[i].title._content + '"><a><img src="'+imgstr+'" height="100" width="100" style=""></a><a href="#" id='+x[i].id+' type="set"><div id="davidbutton">'+x[i].title._content +'</div></a></div>') 
		.appendTo('#sets ul')			
		};
	});	

	console.log(x);
	return false;
	});	
	
	
	
	$('#locate').click(function(event){
	 
	 alert('map function');
	 if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map_canvas"));
        map.setCenter(new GLatLng(37.4419, -122.1419), 7);
        map.setMapType(G_HYBRID_MAP);
        map.setUIToDefault();
        map.enableRotation();
    }

	 });	
	
	$('#get-trails').submit(function() {
        
    	// Add a header for Trails section
		$('#trails').html('<h2>Trails</h2><ul></ul>');

        // Reset #trails and #bookmark sections, as well as trailList and delicious arrays
		$('#trails ul,#stepDetail,#trailDetail,#navigation').empty();
		trailList = []
		delicious = []

		// declare username based on input
		var username = $('#username').val();
        
        // start a counter to use as unique ID for each bookmark
		var idCount = 0;

		// This cross-domain request requires that you use '?callback=?' because it is done using JSONP
		// Also added count=100 so that it can pull more links, 10 seems to be the default
        $.getJSON('http://feeds.delicious.com/v2/json/' + username + '?callback=?' + '&count=100',
        function(json){
			$(json).each(function(index) {
                // this.u // url
                // this.d // description
                // this.n // extended notes
                // this.t // array of tags

                // increment ID counter
				idCount++;
				
				// create an array containing data for the individual bookmark
				var linksubarray = [idCount,this.u,this.d,this.n,this.t];

				// add the bookmark data array into the main delicious data array
				delicious.push(linksubarray); 

				// create a variable representing the tags the individual bookmark
				tags = this.t;

				// iterate through the array of tags, and add new ones into trailList
				for(i=0;i<tags.length;i++) {
					// Read in the tag array, one element at a time. If the tag name contains "trail:", 
					// and the tag does not already exist in our array, add it to the tag array.

					// If the tag is already in trailList, ignore it.
					if ($.inArray(tags[i], trailList) !== -1) {
					}

					// Other, check if the tag contains "trail:"
					else if (tags[i].match(/trail:/g)) {
						// If it does, add it to trailList
						trailList.push(tags[i]);
						// and append it in html to #trails ul
						$('<li></li>').html('<div class = "trailItem" id="' + tags[i] + '"> <a href="#" >'+ tags[i].slice(6) + '</a></div>') // slice out the "tags:" portion of each tag
						.appendTo('#trails ul');				
					}
					
				}

            });	

        });
        return false;
    });
	

});