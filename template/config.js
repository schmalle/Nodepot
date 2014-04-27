/**
 *  configuration file for nodepot, basic web honeypot
 */

var config = {}

config.twitter = {};
config.email = {};
config.ews = {};

config.email.name = "emailname";
config.email.server = "emailserver";
config.email.password = "emailpassword";
config.ews.port = 443;
config.ews.path = "test.php";
config.mode = "test";                               // test // production
config.verbose = true;                              // true // false
config.port = 8888;
config.dl_location = "/opt/nodepot/downloads/";
config.home_ip = "192.168.178";                     // from this origin the status side can be seen


module.exports = config;