/*

    Database related routines

 */

var moment = require("moment");

var redis = require("redis"),
    client = redis.createClient();

var fs = require("fs");

client.on("error", function (err) {
    console.log("Error " + err);
});



function setstore(url)
{
    client.sadd("NP_URL", url);
}

function setstoreMaliciousURL(url)
{
    client.sadd("NP_URL_MALICIOUS", url);
}

/** return all data from the NP_URL set **/
function setgetall(response, attack, config)
{

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');

    console.log(time + ": Updating local file with attack data");

    client.smembers("NP_URL", function (error, value)
    {

        var a = "";

        value.forEach(function (attack) {

            console.log("Found: " + attack);

            if (attack != undefined) {

                response.write(attack + "<br>");
                a = a + attack + "<br>";
            }

        });


        console.log("Info: config ius " + config);

        var filePath = config.html + "/dork.html";

        console.log("Before file writing code " + filePath);


        fs.writeFile(filePath, a, function(err) {
            if(err)
            {
                console.log(err);
                console.log("File path: " + filePath)
            } else
            {
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
 * @param con
 */
function ismember(url, positive, negative, response, config)
{

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');


    client.sismember("NP_URL", url, function (error, value)
    {

        console.log(time + ": Result from sismember call for URL " + url + ": value: " + value + " error: " + error)

        if (1 == value)
        {
            positive(url, response, config);
        }
        else
        {
            negative(url, response, config);
        }

    });

}


/**
 * simple wrapper for the redis call calling sub routines depending on the result
 * @param url
 * @param dest (for filesystem)
 * @param storage code
 * @param callBack from storage code
 */
function isMemberMaliciousURL(url, dest, storeCode, callBack)
{

    var time = moment().format('MMMM Do YYYY, h:mm:ss a');


    client.sismember("NP_URL_MALICIOUS", url, function (error, value)
    {

        console.log(time + ": Result from sismember call for URL " + url + ": value: " + value + " error: " + error)

        if (1 == value)
        {
            console.log("URL " + url + " already known....");
        }
        else
        {
            storeCode(url, dest, callBack);
            setstoreMaliciousURL(url);
        }

    });

}


/** definition of exports **/

exports.setstore=setstore;
exports.setgetall=setgetall;
exports.ismember=ismember;
exports.setstoreMaliciousURL=setstoreMaliciousURL;
exports.isMemberMaliciousURL=isMemberMaliciousURL;