const Twit = require('twit');
const config = require('./config');
const fs = require('fs');
const adjective = require('./strings/adjectives.js');
const greetings = require('./strings/greetings.js');
const comparisons = require('./strings/comparisons.js');


//make a new twit object with config
const T = new Twit(config.keys);

//----------------------------
//  tweeting a simple status
//----------------------------

function tweetThis() {

	const status = {
		status: "This is my first tweet, I'd like to thank my creator for making this happen. #beepboop"
	};

	const postedStatus = (err, data, response) => {
		if(err) {
			console.log("Something went wrong: " + err);
		} else {
			console.log("It worked!");
		}
	};

	T.post('statuses/update', status, postedStatus);

};

//--------------------------------------------------------
//  uploading a media and tweeting a status along with it
//--------------------------------------------------------

function tweetThisMedia() {

  const b64content = fs.readFileSync('./media/twitter_bot_media.png', { encoding: 'base64' })
	
	//uploads the media to twitter
	T.post('media/upload', { media_data: b64content }, (err, data, response) => {
  const mediaIdStr = data.media_id_string //refers to the uploaded media
  const altText = "Twitter bot comic from xkcd" //for use by screen readers
  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  //time to post it on twitter
  T.post('media/metadata/create', meta_params, (err, data, response) => {
  	if (!err) { //attach the status text to the uploaded media
  		const status = { status: "Now that's something I would never do, I swear. I'm Node.js based anyway. #nodejs #python", media_ids: [mediaIdStr] }

  		T.post('statuses/update', status, (err, data, response) => {
  			console.log('IT WORKED!!!')
  		})
  	}
  })
})
};

//-----------------------------------
//  Whenever someone follows debotsy
//-----------------------------------

//pick a random item from an array
Array.prototype.choice = function () {
	return this[Math.floor(Math.random()*this.length)];
};


const stream = T.stream('user')

stream.on('follow', (event) => {
	const name = event.source.name;
	const screenName = event.source.screen_name;
	// tweetThis(`${greet} @${screenName} is ${adj1}, ${adj2}, and ${comp}.`);

const adj1 = adjective.choice();
const adj2 = adjective.choice();
const greet = greetings.choice();
const comp = comparisons.choice();

	T.post('statuses/update', {
		status: `${greet} @${screenName} is ${adj1}, ${adj2}, and ${comp}.`
	}, (err, data, response) => {
		console.log('WORKING WOW')
	})
})

// tweetThisMedia();

// const params = {
// 	q: "eating Mexican",
// 	count: 2
// };

// const getData = (err, data, response) => {
// 	const tweets = data.statuses;
// 	for(let i=0 ; i < tweets.length; i++) {
// 		console.log(tweets[i].text);
// 	}
// };

// T.get('search/tweets', params, getData);



