var Twit = require('twit');
var config = require("/opt/nodepot/config");

function tweet(message) {

    var T = new Twit({
        consumer_key: config.twitter.api_key,
        consumer_secret:  config.twitter.api_key_secret,
        access_token:  config.twitter.access_token,
        access_token_secret:  config.twitter.access_token_secret
    })

//
//  tweet 'hello world!'
//
    T.post('statuses/update', { status: message }, function (err, data, response) {
        // dont log data, it is too long
        //console.log(data)
    })




}

exports.tweet=tweet;