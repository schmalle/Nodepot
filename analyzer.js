/**
 * Created by mschmall on 09/02/14.
 */


var url = require("url");
var db = require("./db");
var S = require('string');
var moment = require("moment");
var dl = require("./downloader");
var crypto = require('crypto');
var rules = require("./template/rules");
var server = require("./reporter");
var hpfeeds = require("nodejs-hpfeeds");

var configGlobal = "none";



/**
 *
 * @param url
 * @param response
 * @construtor
 */
function URLExists(url, response, config)
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
function URLNotExists(url, response, config)
{
    db.setstore(url);

    if (config == undefined)
    {
        if (configGlobal != "none")
        {
            config = configGlobal;
        }
    }

    // update the preloaded file
    db.setgetall(response, config);
}

/**
 * analyze the inbound request
 * @param request
 * @param response
 * @returns {number}
 */
function analyze(request, response, config)
{


    var query = url.parse(request.url).query;
    var urlRequest = request.url;
    var ua = request.headers['user-agent'];
    var checkMe = null;
    var method = request.method;
    configGlobal = config;

    /* */
    var attackerIP = request.connection.remoteAddress;
    if (config.use_forwarded_for != undefined && config.use_forwarded_for)
    {

        for(var item in request.headers)
        {
            if (checkHeaders(item) == "x-forwarded-for")
                attackerIP = request.headers[item];
        }

    }

    if (query != null)
    {

        query = unescape(query);

        var buffer = method + " " + urlRequest;
        for(var item in request.headers) {
            buffer = buffer + "\r\n" + checkHeaders(item) + ":" + request.headers[item];
        }

        console.log(buffer);

        var externalReference = (S(query).contains("http://"));
        var directoryTraversal = (S(query).contains(".."));
        var crossSiteScripting = (S(query).contains("alert("));

        checkMe = checkRules(unescape(request.url));


        if (externalReference || directoryTraversal || crossSiteScripting || checkMe != null)
        {

            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Attack found: " + unescape(request.url) + " from IP: " + attackerIP);
            db.ismember(request.url.toLowerCase(), URLExists, URLNotExists, response, config);

            console.log("unecape url:" + unescape(request.url) + " decodeuri: " + decodeURI(request.url));

            if (checkMe == null)
            {
                if (externalReference)
                    checkMe = "RFI attack";
                if (directoryTraversal)
                    checkMe = "Directory traversal";
                if (crossSiteScripting)
                    checkMe = "Cross Site Scripting";
            }


            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Attack("+ checkMe +") found: " + unescape(request.url) + " from IP: " + attackerIP);

            server.report(config.ews.username, config.ews.password, config.name_hp, attackerIP, moment().format('YYYY-MM-DD h:mm:ss a'), checkMe, "production", config.ews.host, config.ews.path, config.ews.port, new Buffer(buffer).toString('base64'), config);

            // now check all GET parameters
            if (externalReference)
            {
                externalReferenceCheck(request, query, config);
            }
        }
        else
        {
            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found query: " + query + " and path " + unescape(request.url) + " and USER AGENT: " + ua);

            URLExists(request.url, response, config);
        }

    }   // if query != null
    else
    {
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found empty query (/) from IP: " + attackerIP  + " and USER AGENT: " + ua);
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

/**
 *
 * @param url
 * @returns {*}
 */
function checkHeaders(url)
{


    for(var i=0;i<rules.replaceStrings.length;i++)
    {

        if (S(url).contains(rules.replaceStrings[i]))
            return rules.replaceStrings[i++];

        i++;

    }


    return url;

}   // checkHeaders


function externalReferenceCheck(request, query, config)
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

            // we must validate the filename, otherwise a potential directory traversal can happen
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
    var fileName = externalURL.substring(1+ externalURL.lastIndexOf("/"));
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