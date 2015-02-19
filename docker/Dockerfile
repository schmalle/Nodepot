FROM ubuntu:14.04.1
MAINTAINER Markus Schmall

RUN sudo apt-get -y update
RUN sudo apt-get -y upgrade
RUN sudo apt-get -y install nodejs git redis-server curl npm
RUN sudo npm install --save string crypto redis moment
RUN sudo npm install nodemailer --save
RUN sudo npm install emailjs --save
RUN sudo npm install twit string nodejs-hpfeeds put binary urlencode

#--registry=http://r.cnpmjs.org
RUN sudo npm install forever -g

EXPOSE 8888

RUN cd /opt && /usr/bin/git clone https://github.com/schmalle/Nodepot.git
RUN mkdir /etc/nodepot
RUN mkdir /opt/nodepot
RUN mkdir /etc/nodepot/downloads
RUN cp /opt/Nodepot/template/config.js /etc/nodepot/config.js





