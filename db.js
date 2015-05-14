/*

   Database related routines

 */

var moment = require("moment");
var redis = require("redis");
var fs = require("fs");
var configGlobal = "none";
var client = require("./dbcore");

/*

function initClient() {


    var openShiftIP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    if (openShiftIP != undefined)
    {
        console.log("Starting DB client with ip/port server " + process.env.OPENSHIFT_REDIS_PORT + " : " + process.env.OPENSHIFT_REDIS_HOST + " on openshift");
        var client = redis.createClient(process.env.OPENSHIFT_REDIS_PORT, process.env.OPENSHIFT_REDIS_HOST);
        client.auth(process.env.REDIS_PASSWORD);
        return client;

    }
    else {
        console.log("Starting DB without special parameters outside of OpenShift environment ...");
        var client = redis.createClient();
        return client;
    }

}

var client = initClient();

*/


/**
 * retrive the correct path for the stored html data
 * @param config
 * @param openShiftDataDir
 * @returns {string}
 */
function getHtmlPath(config) {

    var openShiftDataDir = process.env.OPENSHIFT_DATA_DIR;

    var configuredHtmlPath = config.html;
    if (openShiftDataDir != undefined)
    {
        configuredHtmlPath = openShiftDataDir + '/html/';
    }
    else
    {
        configuredHtmlPath = config.html;
    }

    return configuredHtmlPath;
}


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

    if( config == undefined && configGlobal != "none")
    {
        config = configGlobal;
    }

    console.log(time + ": Updating local file with attack data");

    client.smembers("NP_URL", function (error, value)
    {

        var a = "";

        value.forEach(function (attack) {

            console.log("Found: " + attack);

            if (attack != undefined) {

             //   response.write(attack + "<br>");
                a = a + attack + "<br>";
            }

        });


        console.log("Info: config is " + config);

        var filePath = getHtmlPath(config) + "/dork.html";

        console.log("Before file writing code " + filePath);
        fs.unlinkSync(filePath);


        var stream = fs.createWriteStream(filePath);
        stream.once('open', function(fd) {
            stream.write(a);
            stream.end();
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
    if( config != undefined)
    {
        configGlobal = config;
    }


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