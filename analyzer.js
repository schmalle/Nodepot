/**
 * Created by mschmall on 09/02/14.
 */


var url = require("url");
var db = require("./db");


/** analyze the request **/
function analyze(request)
{
    var path = url.parse(request.url).path;
    var query = url.parse(request.url).query;
    console.log("Found request to URI " + path);


    db.store("127.0.0.1");

    db.get("127.0.0.1");
    db.get("127.0.0.5");


/**    var hashAll = db.getall();

    console.log("hallas: " + hashAll);


**/

    return 1;

}


/** exports of the module **/
exports.analyze=analyze