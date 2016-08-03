//SETUP VARIABLES
//================================================================================
var authKey = "dc6zaTOxFJmzC";
var queryURLBase = "http://api.giphy.com/v1/gifs/search?q=" 
//These variables wil hold the results we get from the user input after
//adding band buttons and clicking on buttons

//Initial array of bands and artists
var bands = ['The Talking Heads', 'George Clinton', 'The Beatles', 'Gorrilaz', 'Prince'];

//FUNCTIONS
//==================================================================================



//First load the initial array of bands.
	function renderButtons () {
		$('#btns').empty();

		//for loop for initial group of buttons
		for(var i = 0; i < bands.length; i++) {

			var btn = $('<button>')
				btn.addClass('btn btn-default btn-lg');
				btn.attr('data-name', bands[i]);
				btn.text(bands[i]);
				$('#btns').append(btn);


	// This function handles events when the user inputs a band and clicks on add band

	$('#addBand').on('click', function(){

	// This line of code will grab the input from the textbox
	var band = $('#band-input').val().trim();

	// The movie from the textbox is then added to our array
	bands.push(band);
		
	// Our array then runs which handles the processing of our movie array
	renderButtons();

	// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
	return false;
	});


// =======================================================
//Create the queryURL, which equals the base qrl + the band name for the search term. You get 
//the band name from an on click event listener.
$('#btns').on('click', function() {

	var searchTerm = $(this).attr('data-name');

	

	queryURL = queryURLBase + searchTerm + "&limit=9&api-key=" + authKey;
	console.log(queryURL);
	});


//Function that runs the query with the clicked on band
		//creating query URL
		//var queryURL = "http://api.giphy.com/v1/gifs/search?q=The Talking Heads&limit=9&api_key=dc6zaTOxFJmzC";

	// function getGifs (queryURL){
	// 	$.ajax({url: queryURL, method: 'GET'})
	//  		.done(function(response) {
	//      	console.log(response);
	// 		//creating a variable for the ratings of the gifs
	//      	var rating = response.data[i].rating;
	//      	console.log(rating);

	//      	//Setting the variable of image-url to the specific object
	//      	var imageUrl = response.data[i].image_original_url;

	//      	//Creating a variable called bandImage 
	//      	var bandImage = $("<img>");

	//      	//Giving the bandImage the source path and an alt tag
	//      	bandImage.attr('src', imageUrl);
	//      	bandImage.attr('alt', 'btn.text(bands[i])');

	//      	//Adding images

	//      	$('#gifrow').append(bandImage);
	// 	}); 
	// }
	}
}
renderButtons();
	



