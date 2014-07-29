#!/bin/sh

#
# Vagrant provisioning script
#
# expects that the Nodepot root directory is exactly /vagrant
#


puppet module install puppetlabs-nodejs
puppet apply /vagrant/template/puppet.txt
cp /vagrant/template/config.js /etc/nodepot/config.js
