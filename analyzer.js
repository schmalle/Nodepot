/**
 * Created by mschmall on 09/02/14.
 */


var url = require("url");
var db = require("./db");
var S = require('string');
var moment = require("moment");
var dl = require("./downloader");
var config = require('/opt/nodepot/config');
var crypto = require('crypto');
var rules = require("./template/rules");
var server = require("./reporter");



/**
 *
 * @param url
 * @param response
 * @constructor
 */
function URLExists(url, response)
{
    if (config.verbose)
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Starting URLExists with URL " + url);
}

/**
 *
 * @param url
 * @param response
 * @constructor
 */
function URLNotExists(url, response)
{
    db.setstore(url);

    // update the preloaded file
    db.setgetall(response);
}

/**
 * analyze the inbound request
 * @param request
 * @param response
 * @returns {number}
 */
function analyze(request, response)
{
    var query = url.parse(request.url).query;
    var ua = request.headers['user-agent'];
    var checkMe = null;



    if (query != null)
    {

        query = unescape(query);


        var externalReference = (S(query).contains("http://"));
        var directoryTraversal = (S(query).contains(".."));
        var crossSiteScripting = (S(query).contains("alert("));

        if (externalReference || directoryTraversal || crossSiteScripting)
        {
            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Attack found: " + unescape(request.url) + " from IP: " + request.connection.remoteAddress);
            db.ismember(request.url.toLowerCase(), URLExists, URLNotExists, response);


            // moment().format('YYYY-MM-DD h:mm:ss a'

            checkMe = checkRules(request.url);

            if (checkMe == null)
            {
                if (externalReference)
                    checkMe = "RFI attack";
                if (directoryTraversal)
                    checkMe = "Directory traversal";
                if (crossSiteScripting)
                    checkMe = "Cross Site Scripting";
            }

            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Attack("+ checkMe +") found: " + unescape(request.url) + " from IP: " + request.connection.remoteAddress);


            server.report(config.ews.username, config.ews.password, config.name_hp, request.connection.remoteAddress, moment().format('YYYY-MM-DD h:mm:ss a'), checkMe, "production", config.ews.host, config.ews.path, config.ews.port);



            // now check all GET parameters
            if (externalReference)
            {

                externalReferenceCheck(request, query);

            }
        }
        else
        {
            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found query: " + query + " and path " + unescape(request.url) + " and USER AGENT: " + ua);

            URLExists(response);
        }

    }   // if query != null
    else
    {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found empty query (/) from IP: " + request.connection.remoteAddress  + " and USER AGENT: " + ua);
    }

    return checkMe;

}


/**
 *
 * @param url
 * @returns {*}
 */
function checkRules(url)
{


    for(var i=0;i<rules.attackStrings.length;i++)
    {

        if (S(url).contains(rules.attackStrings[i]))
            return rules.attackStrings[i++];

        i++;

    }


    return null;

}   // checkrules



function externalReferenceCheck(request, query)
{

    // get start & max length

    var runner = 0, countrunner = 0, endRunner = 0;
    var len = query.length;
    var count = S(query).count("http");

    if (config.verbose)
        console.log("Number of external references in URL " + query + ": " + count);

    // iterate through the entire string
    while (runner <= len -1)
    {
        if(query.indexOf("http://", runner) > -1)
        {
            runner = query.indexOf("http://", runner);
            endRunner = query.indexOf("&", runner);

            if (endRunner == -1)
            {
                endRunner = len;

                if (config.verbose)
                    console.log("Info: Last entry in query string found");
            }


            // fix
            var externalURL = fixExternalURL(query, runner, endRunner);

            runner = endRunner;
            countrunner++;

            // we must validate the filename, otherwise a potential directory traveral can happen
            var fileName = fixFileName(externalURL);

            if (config.verbose)
                console.log("External reference " + countrunner + ": " + externalURL);

            dl.download(externalURL, config.dl_location + fileName, dl.finishCallBack);


        }
        else
        {   // set end value and force exit
            runner = len;
        }
    }


}


/**
 * extracts a filename if existing
 * @param externalURL
 * @returns {string}
 */
function fixFileName(externalURL)
{
    // we must validate the filename, otherwise a potential directory traveral can happen
    var fileName = externalURL.substring(externalURL.lastIndexOf("/"));
    var lastIndex = externalURL.lastIndexOf("/");
    if (lastIndex == 6)
        fileName = "index.html";

    var shasum = crypto.createHash('sha1');
    shasum.update(externalURL);

    return shasum.digest('hex') + "_" + fileName;
}


/**
 * extracts the external url
 * @param query
 * @param runner
 * @param endRunner
 * @returns {string}
 */
function fixExternalURL(query, runner, endRunner)
{
    // somekind of dirty hack, substr somehow is bot working right on a Mac OS
    var externalURL = query.substr(runner, endRunner);

    if (S(externalURL).contains("&"))
    {
        externalURL = "http://" + S(externalURL).between('http://', '&').s
    }

    return externalURL;

}


/** exports of the module **/
exports.analyze=analyze