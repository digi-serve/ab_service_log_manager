##
## digiserve/ab-log-manager:master
##
## This is our microservice for saving the log entries for our CRUD
## operations.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-log-manager:master .
## $ docker push digiserve/ab-log-manager:master
##

FROM digiserve/service-cli:master

RUN git clone --recursive https://github.com/appdevdesigns/ab_service_log_manager.git app && cd app && npm install

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
