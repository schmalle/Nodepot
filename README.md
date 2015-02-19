Nodepot
=======

Version 0.35: 19.02.2015

Thanks to Angelo Dell'Aera and Andrea De Pasquale for testing.

- not production ready !!! -

A nodejs web application honeypot designed to run in small environments such as
Raspberry PI / Cubietrack

Background:
-----------

With Glaspot Lukas did a great job. Nodepot was initially started as a pure learning
project for NodeJS.


Needed things (Ubuntu/Debian):
------------------------------

apt-get install nodejs redis-server curl npm will install all needed components.
npm install --save string crypto redis moment
(NOT NEEDED) npm install nodemailer --save
npm install emailjs --save
npm install twit
npm install string
npm install nodejs-hpfeeds

On a plain vanilla Debian system add the following

npm install put
npm install binary


If the npm call fails, run the following code to fix the entry.

npm config set registry http://registry.npmjs.org/

IMPORTANT: Copy an adapted version of the config.js file (./template) to /etc/nodepot/config.js

Standard install directory should be /opt/Nodepot


Startup
-------

nodejs app.js will start the server. Please ensure that redis (http://redis.io/) is running.

Optionally as additional parameter you can pass the location / name of the configfile.


Crontab
-------

If you want to include a check in your crontab for the running service, please add
e.g. with a 5 minute interval the following call to your crontab:

/opt/Nodepot/nodepot.sh

Internally it will call corecheck.sh for some additional stuff.


Contact:
--------

markus-schmall@t-online
flakedev on twitter







