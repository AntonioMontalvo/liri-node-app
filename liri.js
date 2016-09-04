//Using the require package we access other dependencies. 
//npm install export 	//npm install require //npm install twitter
var myTweets = require('./keys.js');


//////////////////////////////////
//			Twitter 			//
//////////////////////////////////

// This will show your last 20 tweets and when they were created at in your terminal. For more on this take a look at the twitter API documentation https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline


var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: myTweets.twitterKeys.consumer_key,
  consumer_secret: myTweets.twitterKeys.consumer_secret,
  access_token_key: myTweets.twitterKeys.access_token_key,
  access_token_secret: myTweets.twitterKeys.access_token_secret
});

var params = {screen_name: 'ant mont', count: 20};
////node liri.js my-tweets
if (process.argv[2] === 'my-tweets'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	console.log('This are my last 20 tweets.');
		  	for(var i = 0; i < tweets.length; i++){
		    console.log("tweet number "+ [i + 1] + " : " + tweets[i].text + " . Created: " + tweets[i].created_at);
			}	
		  }
	});
}
 ///node liri.js tweet-something. change status string to your new tweet.
if (process.argv[2] === 'tweet-something'){
	client.post('statuses/update', {status: 'just another tweet'},  function(error, tweet, response) {
		  if(error) throw error;
		  console.log(tweet.created_at);
	}); 
} 

//////////////////////////////////
//			SPOTIFY 			//
//////////////////////////////////
//npm install spotify 
//node liri.js spotify-this-song 'some song'
//API Endpoint Referencehttps://developer.spotify.com/web-api/search-item/ 

var spotify = require('spotify');
var mySong = process.argv[3];



if (process.argv[2] === 'spotify-this-song'){
 
	spotify.search({ type: 'track', query: mySong, limit: 3 }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    console.log('Spotify has the following information about your song:');    
	    console.log('The name of the song you have requested is: '); 
	    console.log(data.tracks.items[0].name);
	    console.log("");
	 	console.log('Here is the name of your artist.');
	 	console.log(data.tracks.items[0].artists[0].name);
	    console.log("");
	 	console.log('Here is the name of album.')
	 	console.log(data.tracks.items[0].album.name);
	 	console.log("");
	    console.log('Here is a preview link of the song.')
	 	console.log(data.tracks.items[0].preview_url);	
	});
}

//////////////////////////////////
//			OMBD API 			//
//////////////////////////////////
// Run a request to the OMDB API with the movie specified
//node liri.js movie-this superman

if (process.argv[2] === 'movie-this'){
	var movieName = process.argv[3];
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&tomatoes=true&plot=short&r=json';


	var request = require('request');

	// Then run a request to the OMDB API with the movie specified
	request(queryUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(body);
			console.log("Movie title: " + JSON.parse(body)["Title"]);
			console.log("Release year: " + JSON.parse(body)["Year"]);
			console.log("IMDB rating: " + JSON.parse(body)["imdbRating"]);
			console.log("This movie was produced in: " + JSON.parse(body)["Country"]);
			console.log("This movie is in: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});
}










	// 
	// }
	// if (process.argv[2] === 'do-what-it-says'){
	// }


//APPLICATION COMMANDS
//node liri.js my-tweets
//node liri.js spotify-this-song 'some song'
//node liri.js movie-this 'some movie'
//node liri.js do-what-it-says