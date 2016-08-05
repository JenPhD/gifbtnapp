$(document).ready(function () {

	//SETUP VARIABLES
	//================================================================================
	var authKey = "dc6zaTOxFJmzC";
	var queryURLBase = "https://api.giphy.com/v1/gifs/search?q=" 
	//These variables wil hold the results we get from the user input after
	//adding band buttons and clicking on buttons

	//Initial array of bands and artists
	var bands = ['The Talking Heads', 'George Clinton', 'The Beatles', 'Gorillaz', 'Prince'];
	
	//FUNCTIONS
	//==================================================================================

	//First load the initial array of bands.
	function renderButtons () {
		$('#btns').empty();

		//for loop for initial group of buttons
		for(var i = 0; i < bands.length; i++) {

			var btn = $('<button>');
				btn.addClass('btn btn-default btn-lg music');
				btn.attr('data-name', bands[i]);
				btn.text(bands[i]);
				$('#btns').append(btn);

		}
	}
	renderButtons();
			
	// Event listener for added bands. 
	//This function handles events when the user inputs a band and clicks on add band

	$('#addBand').on('click', function(){

		// This line of code will grab the input from the textbox and trim any extra spaces
		var band = $('#band-input').val().trim();
		//console.log(band);

		// The movie from the textbox is then added to our array
		bands.push(band);

		//Clear the textbox when done
		$('#band-input').val(" ");
		
		// Our array then runs again to add the user input buttons
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on the button
		return false;

		
	});
	

	// =======================================================
	//Create the queryURL, which equals the base url + the band name for the search term. You get 
	//the band name from an on click event listener. Used document.body because the music class was 
	//created from the function above and was thus out of scope just for a generic on click function.
	$(document.body).on('click', '.music', function() {
		//first empty the div with the gifs
	   	$('#gif1').empty();
	   	$('#gif2').empty();
	   	$('#gif3').empty();

		//This replaces the spaces in a band name with + so the URL works
		var searchTerm = $(this).data('name').split(' ').join('+');

		//This builds the queryURL with the queryURLBase, the search term, a limit of 9 gifs,
		//and the authorization key. 
		var queryURL =  queryURLBase + searchTerm + "&limit=9&api_key=" + authKey;
		console.log(queryURL);

		//Retrieves the JSON from the giphy API.
		$.ajax({url: queryURL, method: 'GET'})
	 	.done(function(response) {
	    console.log(response);

	    	//Giphys is an array of objects returned from the API.
	    	var giphys = response.data;
	    	//console.log(giphys);

	    		//for loop for the 9 objects in the giphy array.
	    		for (var j = 0; j < giphys.length; j++) {
	     	
	     			//Create a new div for the music gifs

	     			var musicDiv = $('<div class="gif">');
					
	     			//Add the ratings
	      			var rating = $('<p>').text("Rating: " + giphys[j].rating);
	     			//console.log(rating);

	     			//Get still images and animated gifs

	     			var bandImages = $('<img>')
	     			.addClass('bandimg')
	     			.attr('src', giphys[j].images.fixed_height_still.url)
	     			.attr('data-still', giphys[j].images.fixed_height_still.url)
	     			.attr('data-animate', giphys[j].images.fixed_height.url)
	     			.attr('data-state', 'still');
	     		
	     			musicDiv.prepend(rating);
	     			musicDiv.prepend(bandImages);

	     			//Putting 3 gifs in each column
	     			if(j < 3) {
	      				$('#gif1').append(musicDiv);
	      			}
	      			else if (j < 6) {
	      				$('#gif2').append(musicDiv);
	      			}
	      			else {
	      				$('#gif3').append(musicDiv);
	      			}	
	      		}

	      		$('.bandimg').on('click', function() {
					var state = $(this).attr('data-state'); 
						//console.log(state);
						//console.log(this);

					if (state == 'still') {
                			$(this).attr('src', $(this).data('animate'));
                			$(this).data('state', 'animate');
            		} else {
                			$(this).attr('src', $(this).data('still'));
                			$(this).data('state', 'still');
            		}  	
				});	
	    	
		
	    }); 	
	      		
					
	});


});//ending document ready
	



