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

ARG BRANCH=master

FROM digiserve/service-cli:${BRANCH}

COPY . /app

WORKDIR /app

RUN npm i -f

WORKDIR /app

CMD [ "node", "--inspect=0.0.0.0:9229", "app.js" ]
