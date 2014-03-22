/**
 * Created by mschmall on 09/02/14.
 */


var url = require("url");
var db = require("./db");
var S = require('string');
var moment = require("moment");

/**
 *
 * @param url
 * @param response
 * @constructor
 */
function URLExists(url, response)
{
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


    if (query != null) {

        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found query: " + query + " and path " + request.url);

        var externalReference = (S(query).contains("http://"));
        var directoryTraversal = (S(query).contains(".."));
        var crossSiteScripting = (S(query).contains("alert("));

        if (externalReference || directoryTraversal || crossSiteScripting) {
            console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Attack found: " + request.url + " from IP: " + request.connection.remoteAddress);
            db.ismember(request.url, URLExists, URLNotExists, response);
        }
        else {
            URLExists(response);
        }

    }   // if query != null
    else
    {
        //console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ": Found empty query: ");
    }

}


/** exports of the module **/
exports.analyze=analyze