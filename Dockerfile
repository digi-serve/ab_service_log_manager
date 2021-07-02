##
## digiserve/ab-log-manager:develop
##
## This is our microservice for saving the log entries for our CRUD
## operations.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-log-manager:develop .
## $ docker push digiserve/ab-log-manager:develop
##

FROM digiserve/service-cli:develop

RUN git clone --recursive https://github.com/appdevdesigns/ab_service_log_manager.git app && cd app && git checkout develop && npm install

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
