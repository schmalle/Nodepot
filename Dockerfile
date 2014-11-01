FROM ubuntu
MAINTAINER Markus Schmall

RUN sudo apt-get update
RUN sudo apt-get -y install nodejs git
RUN sudo apt-get -y install redis-server curl npm
RUN sudo npm install --save string crypto redis moment
RUN sudo npm install nodemailer --save
RUN sudo npm install emailjs --save
RUN sudo npm install twit
RUN sudo npm install string
RUN sudo npm install nodejs-hpfeeds
RUN sudo npm install put
RUN sudo npm install binary

EXPOSE 8888

RUN cd /opt && /usr/bin/git clone https://github.com/schmalle/Nodepot.git
RUN mkdir /etc/nodepot
RUN cp /opt/Nodepot/template/config.js /etc/nodepot/config.js

RUN /opt/Nodepot/dbstart.sh
RUN /opt/Nodepot/nodepot.sh

