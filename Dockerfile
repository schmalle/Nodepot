FROM ubuntu
MAINTAINER Markus Schmall

RUN apt-get install nodejs redis-server curl npm will install all needed components.
RUN npm install --save string crypto redis moment
RUN npm install nodemailer --save
RUN npm install emailjs --save
RUN npm install twit
RUN npm install string
RUN npm install nodejs-hpfeeds
 
# CMD ["/usr/local/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"] 

