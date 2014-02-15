/**
 * Created by mschmall on 09/02/14.
 */

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
            console.log("Stored IP " + url);
        }
    );
}


/** returns a value for a key **/
function get(url)
{
    client.get("NP_IP_"+url, function (error, value)
    {
        if (value == null)
        {
            console.log("db.get(): ERROR: Key NP_IP_" + url + " not existing...");
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
    return client.keys("NP_IP_*");
}


function setstore(ip)
{
    client.sadd("NP_IP", ip);
}


/** return all data from the NP_IP set **/
function setgetall(response)
{
    client.smembers("NP_IP", function (error, value)
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
 * @param ip
 * @param positive
 * @param negative
 * @param response
 */
function ismember(ip, positive, negative, response)
{

    client.sismember("NP_IP", ip, function (error, value)
    {

        console.log("Result from sismember call for ip " + ip + ": value: " + value + " error: " + error)

        if (1 == value)
        {
            positive(ip, response);
        }
        else
        {
            negative(ip, response);
        }

    });

}

exports.store = store;
exports.getall = getall;
exports.get=get

exports.setstore=setstore;
exports.setgetall=setgetall;
exports.ismember=ismember;
