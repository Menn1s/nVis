#!/bin/bash
cd ~
apt-get install vsftpd -y
mv /etc/vsftpd.conf /etc/vsftpdbackup.conf
mv ~/nVis/vsftpd.conf /etc 
mkdir /var/ftp
mkdir /var/ftp/pub
chown ftp:ftp /var/ftp/pub
chmod 777 /var/ftp/pub
systemctl restart vsftpd
while true
do
python3 ./nmaptomongo
done


