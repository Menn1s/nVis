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

nVis prioritizes speed and ease of use, operating with a client-server design! Each client contributes to the MongoDB by running automated repeating scans on specified subnets; these scans are then pushed via ftp to the server (which is started with a single docker-compose command) that then parses and adds them to the front-end.

# Quick-Start

To run the nVis server:
  
  Ensure that you are running as root user. Requires docker and docker-compose on the server.
  
  1. git clone https://github.com/Menn1s/nVis
  2. cd /nVis
  3. apt-get update
  4. docker-compose up -d
  5. chmod +x serverScript
  6. ./serverScript 
    
To run the nVis client:
  
  Ensure that you are running as the root user.
  PLEASE NOTE: Client scripts should be run after server script has completed.
  
  1. git clone https://github.com/Menn1s/nVis
  2. cd /nVis
  3. apt-get update
  4. apt install docker-compose
  5. python3 clientScript.py 
  6. Enter in the IP of the nVis server
  7. Enter your name or any unique ID
  8. Enter in the IP address/CIDR that you are scanning for
  
  
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



# To-do:  
- Add a notes function to each host on the website  
- Add sorting functionality  
- Use sorting, filters, and multiple pages to increase speed and limit queries per page  
- Switch to a more secure, flexible client-server interaction with SSH  
- Indicate new hosts/services  


Credits and Thanks to:
  
Project: nmap-to-mongo https://github.com/erforschr/nmap-to-mongo  
License (MIT): https://github.com/erforschr/nmap-to-mongo/blob/master/LICENSE 


  
  
  
  
