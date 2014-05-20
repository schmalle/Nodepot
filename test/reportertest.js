var server = require("./../reporter");
var config = require("/opt/nodepot/config");
var moment = require("moment");

// function report(username, password, host, ip, time, attacktype, mode, alarmHost, alarmURL) {


server.report(config.ews.username, config.ews.password, "myhost", "127.0.0.9", moment().format('YYYY-MM-DD h:mm:ss a'), "webattack", "production", config.ews.host, config.ews.path, config.ews.port);

// 2013-06-28 10:35:09