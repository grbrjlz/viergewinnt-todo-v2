# ToDo Application

## Run local

RUN `cd frontend && npm i`

RUN `npm start`



## Deploy Code with Infrastracture as a Service

## before you push:

RUN `cd frontend && npm i && cd ..`

RUN `cd frontend && npm run build && cd ..`

RUN `cd frontend && rm -r node_modules && cd ..`

RUN `cd backend && rm -r node_modules && cd ..`

## Push the programm code:

RUN `push.sh script to copy all files to the selected Server.`

## LOGIN into your Server with the gcloud ssh command and navigate to the programm-folder.

RUN `./init-server.sh` script as root to install all runtime dependencies (you just have to do this once on a new server)

RUN `./deploy.sh` script to deploy and start the app.




## Deploy Code with Platform as a Service

RUN `cd frontend && npm i && npm run build && cd ..`

RUN `cd frontend && gcloud app deploy viergewinnt-frontend.yaml && cd ..`


