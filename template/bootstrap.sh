#!/bin/sh

#
# Vagrant provisioning script
#
# expects that the Nodepot root directory is exactly /vagrant
#

#docker run -name nodepot_ins -p 8889:8889 -t -i honeynet/nodepot /bin/bash
sudo apt-get -y update
sudo apt-get -y upgrade
sudo apt-get -y install docker.io
ln -sf /usr/bin/docker.io /usr/local/bin/docker
sed -i '$acomplete -F _docker docker' /etc/bash_completion.d/docker.io


