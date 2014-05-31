#!/bin/sh

#
# Vagrant provisioning script
#

puppet module install puppetlabs-nodejs
puppet apply /vagrant/puppet.txt