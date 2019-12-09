FROM ubuntu:latest
RUN apt-get update && apt-get install -y openssh-client
RUN mkdir /keys
RUN ssh-keygen -q -t rsa -b 4096 -N '' -f /keys/id_rsa
RUN apt install -y nginx
RUN cp /keys/id_rsa.pub /var/www/html/index.html
RUN rm /var/www/html/index.nginx-debian.html

EXPOSE 80

CMD ["service", "nginx","start"]
