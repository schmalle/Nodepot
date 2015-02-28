/**
 *  configuration file for nodepot, basic web honeypot
 */

var config = {};

config.twitter = {};
config.email = {};
config.ews = {};
config.hpfeeds = {};

//
//
//

config.twitter.access_token = "";
config.twitter.access_token_secret = "";
config.twitter.api_key = "";
config.twitter.api_key_secret = "";
config.twitter.use = "no";
config.twitter.verbose = "no";



config.email.use = "no";                            // new in version 0.34
config.email.name = "emailname";
config.email.server = "emailserver";
config.email.password = "emailpassword";

//
//
//

config.ews.use = "no";
config.ews.host = "127.0.0.1";
config.ews.port = 443;
config.ews.path = "test.php";
config.ews.username = "";
config.ews.password = "";

//
//
//

config.html = "/opt/Nodepot/html";                  // new in version 0.34
config.mode = "test";                               // test // production
config.verbose = true;                              // true // false
config.port = 8889;
config.use_forwarded_for = true;
config.dl_location = "/opt/nodepot/downloads/";
config.home_ip = "192.168.178";                     // from this origin the status side can be seen
config.name_hp = "Nodepot";
config.my_ip = "127.0.0.1";

//
// config data for hpfeeds by Honeynet project
//

config.hpfeeds.port = 10000;
config.hpfeeds.server = "hpfeeds.honeycloud.net";
config.hpfeeds.channel = "test";
config.hpfeeds.ident = "test";
config.hpfeeds.secret = "test";
config.hpfeeds.use = "yes";


module.exports = config;