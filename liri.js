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

if (process.argv[2] === 'my-tweets'){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for(var i = 0; i < tweets.length; i++){
		    console.log("tweet number "+ [i + 1] + " : " + tweets[i].text + " . Created: " + tweets[i].created_at);
			}	
		  }
	});
}
 



// if (process.argv[2] === 'spotify-this-song'){
	// }
	// if (process.argv[2] === 'movie-this'){
	// }
	// if (process.argv[2] === 'do-what-it-says'){
	// }



//node liri.js my-tweets
//node liri.js spotify-this-song 'some song'
//node liri.js movie-this 'some movie'
//node liri.js do-what-it-says