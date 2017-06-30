const Twit = require('twit');
const config = require('./config');

//make a new twit object with config
const T = new Twit(config);

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



