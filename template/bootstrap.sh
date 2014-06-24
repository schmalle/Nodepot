#!/bin/sh

#
# Vagrant provisioning script
#

puppet module install puppetlabs-nodejs
puppet apply /vagrant/puppet.txt
cp /vagrant/template/config.js /etc/nodepot/config.js
