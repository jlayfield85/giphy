var movieTitle = ['Waterboy', 'Contact', 'The Matrix', 'Godzilla', 'Slammin Salmon', 'Zoolander', 'Anchorman', 'Superbad', 'Bat-Man', 'Split', 'Glass'];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

//Button
function createButtons(){
	$('#Movie-Button').empty();
	for(var i = 0; i < movieTitle.length; i++){
		var showBtn = $('<button>').text(movieTitle[i]).addClass('showBtn').attr({'data-name': movieTitle[i]});
		$('#Movie-Button').append(showBtn);
	}

	//GIF by submission
	$('.showBtn').on('click', function(){
		$('.display').empty();

		var thisMovie = $(this).data('name');
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=movie+" + thisMovie + "&limit=10&api_key=6p1SAhCSKXiTuOcPJp88Tz8kWAIlbIYU";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addMovie').on('click', function(){
	var newMovie = $('#newMovieInput').val().trim();
	showTitle.push(newMovie);
	createButtons();
	return false;
});

createButtons();