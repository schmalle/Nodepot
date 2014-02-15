/**
 * Created by mschmall on 09/02/14.
 */


var url = require("url");
var db = require("./db");
var S = require('string');

/**
 *
 * @param url
 * @param response
 * @constructor
 */
function URLExists(url, response)
{
    console.log("Starting URLExists with URL " + url);
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
    var path = url.parse(request.url).path;
    var query = url.parse(request.url).query;

    console.log("Found path: " + path);
    console.log("Found query: " + query);

    var externalReference =  (S(query).contains("http://"));
    var directoryTraversal = (S(query).contains(".."));
    var crossSiteScripting = (S(query).contains("alert("));

    if (externalReference || directoryTraversal || crossSiteScripting)
    {
         console.log("Some form of attack found");
         db.ismember(path, URLExists, URLNotExists, response);
    }
    else
    {
        URLExists(response);
    }

}


/** exports of the module **/
exports.analyze=analyze