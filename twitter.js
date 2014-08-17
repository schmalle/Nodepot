var Twit = require('twit');
var moment = require("moment");

var config = require("/etc/nodepot/config");

function tweet(message) {

    var T = new Twit({
        consumer_key: config.twitter.api_key,
        consumer_secret:  config.twitter.api_key_secret,
        access_token:  config.twitter.access_token,
        access_token_secret:  config.twitter.access_token_secret
    })


    // update the status
    var usetwitter = config.twitter.use;

    // check, if ews useage is defined, if not, skip and log
    if ( typeof usetwitter !== 'undefined' && usetwitter == "yes") {

        T.post('statuses/update', { status: message }, function (err, data, response) {
            // dont log data, it is too long
            //console.log(data)
        })

    }
    else
    {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": No twitter reporting activated / configured");
    }


}

exports.tweet=tweet;