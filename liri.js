//Using the require package we access other dependencies. 
//npm install export 	//npm install require //npm install twitter

//////////////////////////////////
//			Twitter 			//
//////////////////////////////////

// This will show your last 20 tweets and when they were created at in your terminal. For more on this take a look at the twitter API documentation https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline

var myTweets = require('./keys.js');
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

if (process.argv[2] === 'tweet-something'){
	client.post('statuses/update', {status: 'Done with basic requirement LIRI'},  function(error, tweet, response) {
		  if(error) throw error;
		  console.log(tweet.created_at);
	}); 
} 
 ///node liri.js tweet-something. change status string to your new tweet.
//////////////////////////////////
//			SPOTIFY 			//
//////////////////////////////////
//npm install spotify 
//node liri.js spotify-this-song 'some song'
//API Endpoint Referencehttps://developer.spotify.com/web-api/search-item/ 

var spotify = require('spotify');

if (process.argv[2] === 'spotify-this-song'){
 if(process.argv[3] === undefined){
	console.log('the is the 3rd arg ' + true);
	spotify.search({ type: 'track', query: 'artist:ace+of+base+track:the+sign', limit: '1' }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		    // console.log(data);
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
	 } else if (process.argv[3] !== undefined){

		var nodeArgs = process.argv;

		// Create an empty string for holding the address
		var mySong = "";

		// Capture all the words in the address (again ignoring the first two Node arguments)
		for (var i=3; i < nodeArgs.length; i++){
			mySong = mySong + "+" + nodeArgs[i];
		}
		spotify.search({ type: 'track', query: mySong}, function(err, data) {
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
}

//////////////////////////////////
//			OMBD API 			//
//////////////////////////////////
// Run a request to the OMDB API with the movie specified
//node liri.js movie-this superman

if (process.argv[2] === 'movie-this'){
	var movieName = process.argv[3];
	if(process.argv[3] === undefined){
		movieName = 'Mr. Nobody';
	}
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&tomatoes=true&plot=short&r=json';


	var request = require('request');

	// Then run a request to the OMDB API with the movie specified
	request(queryUrl, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(body);
			console.log("Movie title: " + JSON.parse(body)["Title"]);
			console.log("");
			console.log("Release year: " + JSON.parse(body)["Year"]);
			console.log("");
			console.log("IMDB rating: " + JSON.parse(body)["imdbRating"]);
			console.log("");
			console.log("This movie was produced in: " + JSON.parse(body)["Country"]);
			console.log("");
			console.log("This movie is in: " + JSON.parse(body)["Language"]);
			console.log("");
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("");
			console.log("Actors: " + JSON.parse(body)["Actors"]);
			console.log("");
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
			console.log("");
			console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
		}
	});
}

//////////////////////////////////
//			FS READ-FILE	        //
//////////////////////////////////
//fs stands for file system. build in in node.
//node liri.js do-what-it-says
var fs = require('fs'); 

if (process.argv[2] === 'do-what-it-says'){
	var dataArr;
	 fs.readFile("random.txt", "utf8", function(error, data) {
		if(error){
			return console.log(error);
		}
		// // Then split it by commas (to make it more readable)
		dataArr = data.split(',');
		var trimmedArr = dataArr.map(function(item){
			return item.trim().length;
		});
		// console.log(dataArr[1]);
	
	 		spotify.search({ type: 'track', query: dataArr[1]}, function(err, data) {
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
	});
}	 
//////////////////////////////////
//	BONUS	FS APPEND-FILE	    //
//////////////////////////////////

var nodeArgs = process.argv;
var myArgs = process.argv.slice(2);

	fs.appendFile( "log.txt", myArgs + " ", function(err) {
		if(err){
			console.log(err);
		}
	}); 

//APPLICATION COMMANDS
//node liri.js my-tweets
//node liri.js spotify-this-song 'some song'
//node liri.js movie-this 'some movie'
//node liri.js do-what-it-says