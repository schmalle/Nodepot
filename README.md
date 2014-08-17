Nodepot
=======

Version 0.3: 11.08.2014

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
npm install nodejs-hpfeeds

If the npm call fails, run the following code to fix the entry.

npm config set registry http://registry.npmjs.org/

IMPORTANT: Copy an adapted version of the config.js file (./template) to /etc/nodepot/config.js

Standard install directory should be /opt/Nodepot


Startup
-------

nodejs app.js will start the server. Please ensure that redis (http://redis.io/) is running.


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







