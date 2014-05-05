var server = require("./../reporter");
var config = require("/opt/nodepot/config");

// function report(username, password, host, ip, time, attacktype, mode, alarmHost, alarmURL) {


server.report(config.ews.username, config.ews.password, "myhost", "127.0.0.9", "NOW", "webattack", "production", config.ews.host, config.ews.path, config.ews.port);

