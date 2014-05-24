Nodepot
=======

Version 0.1: 19.04.2014

- not production ready !!! -

A nodejs web application honeypot designed to run in small environments

Needed things (Ubuntu/Debian):
------------------------------

apt-get install nodejs redis-server curl npm will install all needed components.
npm install --save string crypto redis moment
(NOT NEEDED) npm install nodemailer --save
npm install emailjs --save
npm install twit

If the npm call fails, run the following code to fix the entry.

npm config set registry http://registry.npmjs.org/

Copy an adapted version of the config.js file (./template) to /opt/nodepot/config.js


Startup
-------

nodejs app.js will start the server.


Contact:
--------

markus-schmall@t-online
flakedev on twitter







