/*
	- Flickr2Article
	- Developed by Diro Fan - http://diro.tw
*/

(function(jQuery) {

	jQuery.fn.getPhotosetList = function(args) {
		var $element = jQuery(this), // reference to the jQuery version of the current DOM element
		    element = this;         // reference to the actual DOM element
		
		// Public methods
		var methods = {
			init : function () {
				// Extend the default options
				settings = jQuery.extend({}, defaults, args);
				
				// Make sure the api key and setID are passed
				if (settings.flickrKey === null) {
					alert('You must pass an API key');
					return;
				}		

				// Get the Flickr Set :)
				var user_id = $('#user_id').val();
				
		
				$.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getList&user_id=" + user_id + "&api_key=" + settings.flickrKey + "&jsoncallback=?", function(setData){
				
					var length = setData.photosets.photoset.length;					
					var htmldata = "";			

					var template = $("#op_panel > textarea").val();			

					for (i = 0; i < length; i++) {
						$('#photosetlist').append(new Option(setData.photosets.photoset[i].title._content, setData.photosets.photoset[i].id, (i == 0), (i == 0)));						
					}

					$('#article_div').flickr2Article({
						"flickrKey" : settings.flickrKey
					});
				});
			}
		}
		// For extending the defaults!
		var defaults = {
			"flickrSet" : null,
			"flickrKey" : null
		}
		var settings = {}
		
		// Init this thing
		jQuery(document).ready(function () {
			methods.init();
		});		
	}
	jQuery.fn.flickr2Article = function(args) {
		
		var $element = jQuery(this), // reference to the jQuery version of the current DOM element
		    element = this;         // reference to the actual DOM element
		
		// Public methods
		var methods = {
			init : function () {
				// Extend the default options
				settings = jQuery.extend({}, defaults, args);
				
				// Make sure the api key and setID are passed
				if (settings.flickrKey === null) {
					alert('You must pass an API key');
					return;
				}		

				// Get the Flickr Set :)
				$.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&extras=description&photoset_id=" + $('#photosetlist').find(":selected").val() + "&api_key=" + settings.flickrKey + "&jsoncallback=?", function(flickrData){
					
					var length = flickrData.photoset.photo.length;
					var htmldata = "";			

					var template = $("#op_panel > textarea").val();			
					
					for (i = 0; i < length; i++) {
						//320x240
						var photo_n_URL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret +'_n.jpg';

						//500X375
						var photo_o_URL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret +'.jpg';

						//640x480
						var photo_z_URL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret +'_z.jpg';

						//800x600
						var photo_c_URL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret +'_c.jpg';

						if (flickrData.photoset.photo[i].description._content != "") {
							var item = template;
							item = item.replace("[DESC]", flickrData.photoset.photo[i].description._content);
							item = item.replace("[TITLE]", flickrData.photoset.photo[i].title);
							item = item.replace("[IMG_N]", "<img src=" + photo_n_URL + " alt='" + flickrData.photoset.photo[i].title +"'>\n");
							item = item.replace("[IMG_O]", "<img src=" + photo_o_URL + " alt='" + flickrData.photoset.photo[i].title +"'>\n");
							item = item.replace("[IMG_Z]", "<img src=" + photo_z_URL + " alt='" + flickrData.photoset.photo[i].title +"'>\n");
							item = item.replace("[IMG_C]", "<img src=" + photo_c_URL + " alt='" + flickrData.photoset.photo[i].title +"'>\n");
							//item = item.replace("[IMG_Z]", "<img src=" + photo_z_URL + " style=\"width:" + $("#photo_width").val() + "px\">\n");
							htmldata += item;
						}						
					}
					
					$("#article_div").html(htmldata);				
					$("#sourcecode").val(htmldata);				

					
				});
				
			}
		}
		
	
				
		var defaults = {
			"flickrKey" : null,
		}				
		var settings = {}
				
		jQuery(document).ready(function () {
			methods.init();
		});		
	}
	

})(jQuery);
