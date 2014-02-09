/**
 * Created by mschmall on 09/02/14.
 */

var redis = require("redis"),
    client = redis.createClient();

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


exports.store = store;
exports.getall = getall;
exports.get=get
