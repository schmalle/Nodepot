var redis = require("redis");

var port = process.env.OPENSHIFT_REDIS_PORT;

function initClient()
{
    var openShiftIP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
    if (openShiftIP != undefined)
    {
        console.log("Starting DB client with ip/port server " + port + " : " + process.env.OPENSHIFT_REDIS_HOST + " on openshift");

        var client = redis.createClient(port, process.env.OPENSHIFT_REDIS_HOST);
        client.auth(process.env.REDIS_PASSWORD);
        return client;

    }
    else
    {
        console.log("Starting DB without special parameters outside of OpenShift environment ...");
        var client = redis.createClient();
        return client;
    }

}

var client = initClient();
console.log("Starting after initclient...");

if (client != undefined)
{
    console.log("client after initClient is defined");
}
else
{
    console.log("client after initClient is not defined");
}

module.exports = client;
exports.initClient = initClient;