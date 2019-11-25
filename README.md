```
           ,.         ,·´'; '      ,.-.                        ,.-·.                  ,. -,    
      ;'´*´ ,'\       ,'  ';'\°    /   ';\ '                    /    ;'\'          ,.·'´,    ,'\   
      ;    ';::\      ;  ;::'\   ';    ;:'\      ,·'´';        ;    ;:::\     ,·'´ .·´'´-·'´::::\' 
     ;      '\;'      ;  ;:::;    ';   ;::;     ,'  ,''\      ';    ;::::;'   ;    ';:::\::\::;:'  
    ,'  ,'`\   \      ;  ;:::;    ';   ';::;   ,'  ,':::'\'     ;   ;::::;    \·.    `·;:'-·'´     
    ;  ;::;'\  '\    ;  ;:::;      ';   ;:;  ,'  ,':::::;'    ';  ;'::::;      \:`·.   '`·,  '     
   ;  ;:::;  '\  '\ ,'  ;:::;'       ;   ;:;'´ ,'::::::;'  '   ;  ';:::';         `·:'`·,   \'      
  ,' ,'::;'     '\   ¨ ,'\::;'        ';   '´ ,·':::::;'        ';  ;::::;'         ,.'-:;'  ,·\     
  ;.'\::;        \`*´\::\; °        ,'   ,.'\::;·´           \*´\:::;     ,·'´     ,.·´:::'\    
  \:::\'          '\:::\:' '          \`*´\:::\;              '\::\:;'      \`*'´\::::::::;·'   
    \:'             `*´'              '\:::\;'                   `*´         \::::\:;:·´        
                                       `*´                                   '`*'´            
```

A lightweight red teaming platform utilizing concurrent nmap scans to populate a collaborative web server. This tool was developed specifically for the purposes of short term engagements or penetration testing competitions. 

To run the nVis server:
  
  Ensure that you are running as root user and you are in the root directory when cloning this repository.
  
  1. cd /nVis
  2. apt-get update
  3. docker-compose up -d
  4. chmod +x serverScript
  5. ./serverScript 
    
To run the nVis client:
  
  Ensure that you are running as root user and you are in the root directory when cloning this repository. 
  PLEASE NOTE: Client scripts should be run after server script has completed.
  
  1. cd /nVis
  2. apt-get update
  3. python3 clientScript.py 
  4. Enter in the IP of the nVis server
  5. Enter your name or any unique ID
  6. Enter in the IP address/CIDR that you are scanning for
  
  
To view the web server:
  
  1. Navigate to http://[nVis Server IP]:3000
  
Features:
  1. Clicking on the host's box will change the color which will update in real time to others on the site.
    
    Orange - In Progress
    Green - Completed
    Blue - Found Something + Investigate Later
  
# How it works:

The client script will run a ping scan on the specified network and store the hosts that are up into a text file. 
It will then check to see if there are any hosts that do not respond to ping but have common ports open and output the active hosts into a second file. Only unique IPs from both text files will be run against an intense scan.
The intense nmap scan's XML will be uploaded to the nVis server's /var/ftp/pub folder.
The server script will install the required dependencies, copy the vsftpd.conf file that has been edited to allow for anonymous upload, and run the nmaptomongo script. The script parses through the clients' nmap XML and puts the data into the mongo database.


  
## Docker:
A simple docker compose scripts pulls a custom ubuntu image with the nVis application and links it to a mongodb container.

The mongodb has an attached volume 'data' in the nVis root directory for persistent data.

## What it looks like:
![nVis Screenshot](https://github.com/Menn1s/nVis/blob/master/nVis%20Screenshot.PNG)

  
  
  
  
