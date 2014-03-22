/**
 * Created by mschmall on 09/02/14.
 */

var moment = require("moment");


var redis = require("redis"),
    client = redis.createClient();

var fs = require("fs");

client.on("error", function (err) {
    console.log("Error " + err);
});


/** just store the input value with a prefixed NP_IP_ **/
function store(url)
{

    client.set("NP_IP_" + url, "dummy", function ()
        {
            var time = moment().format('MMMM Do YYYY, h:mm:ss a');
            console.log(time + ": Stored IP " + url);
        }
    );
}


/** returns a value for a key **/
function get(url)
{
    client.get("NP_URL_"+url, function (error, value)
    {
        if (value == null)
        {
            console.log("db.get(): ERROR: Key NP_URL_" + url + " not existing...");
        }
        else
        {
            console.log("db.get(): Found value " + value);
        }

        return value;

    });
}


/** return all data matching a certain key **/
function getall()
{
    return client.keys("NP_URL_*");
}


function setstore(url)
{
    client.sadd("NP_URL", url);
}


/** return all data from the NP_IP set **/
function setgetall(response, attack)
{

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    console.log(time + ": Updating local file with attack data");

    client.smembers("NP_URL", function (error, value)
    {

        var a = "";

        value.forEach(function (attack) {

            console.log("Found value: " + attack);
            response.write(attack + "<br>");
            a = a + attack + "<br>";

        });

        fs.writeFile("./html/dork.html", a, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
        return value;

    });
}


/**
 * simple wrapper for the redis call calling sub routines depending on the result
 * @param url
 * @param positive
 * @param negative
 * @param response
 */
function ismember(url, positive, negative, response)
{

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');


    client.sismember("NP_URL", url, function (error, value)
    {

        console.log(time + ": Result from sismember call for URL " + url + ": value: " + value + " error: " + error)

        if (1 == value)
        {
            positive(url, response);
        }
        else
        {
            negative(url, response);
        }

    });

}

exports.store = store;
exports.getall = getall;
exports.get=get

exports.setstore=setstore;
exports.setgetall=setgetall;
exports.ismember=ismember;
