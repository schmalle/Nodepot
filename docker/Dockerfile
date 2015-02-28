FROM ubuntu:14.04.2
MAINTAINER Markus Schmall

RUN sudo apt-get -y update && sudo apt-get -y upgrade
RUN sudo apt-get -y install nodejs git redis-server curl npm supervisor
RUN sudo npm install --save string crypto redis moment nodemailer emailjs
RUN sudo npm install twit string nodejs-hpfeeds put binary urlencode

#--registry=http://r.cnpmjs.org
RUN sudo npm install forever -g

EXPOSE 8889

RUN cd /opt && /usr/bin/git clone https://github.com/schmalle/Nodepot.git
RUN mkdir /etc/nodepot && mkdir /opt/nodepot && mkdir /etc/nodepot/downloads
RUN cp /opt/Nodepot/template/config.js /etc/nodepot/config.js

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]




