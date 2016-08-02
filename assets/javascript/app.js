$(document).ready(function () {


//Initial array of bands and artists
var bands = ['The Talking Heads', 'George Clinton', 'The Beatles', 'Gorrilaz', 'Prince'];

//Generic function for displaying band data
function renderButtons () {
	$('#btns').empty();

	for(var i = 0; i < bands.length; i++) {

		var btn = $('<button>')

		btn.addClass('btn btn-default btn-lg');
		btn.attr('data-name', bands[i]);
		btn.text(bands[i]);
		$('#btns').append(btn);
	}	

}

renderButtons();

//creating query URL
var queryURL = "http://api.giphy.com/v1/gifs/search?q=music&limit=9&api_key=dc6zaTOxFJmzC";

	$.ajax({url: queryURL, method: 'GET'})
	 .done(function(response) {
	     console.log(response);
	}); 

});//ending document ready.