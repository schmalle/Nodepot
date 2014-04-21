/**
 * Created by mschmall on 13/04/14.
 */

var email   = require("emailjs");

var server  = email.server.connect({
    user:    "username",
    password:"password",
    host:    "smtp.gmail.com",
    ssl:     true
});

var message = {
    text:    "i hope this works",
    from:    "you <username@gmail.com>",
    to:      "someone <someone@gmail.com>, another <another@gmail.com>",
    cc:      "else <else@gmail.com>",
    subject: "testing emailjs",
    attachment:
        [
            {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
            {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
};

// send the message and get a callback with an error or details of the message that was sent
server.send(message, function(err, message) { console.log(err || message); });

// you can continue to send more messages with successive calls to 'server.send',
// they will be queued on the same smtp connection

// or you can create a new server connection with 'email.server.connect'
// to asynchronously send individual emails instead of a queue