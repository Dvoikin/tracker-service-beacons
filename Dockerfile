FROM pipdevs/node:8.4.0

WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

ENV MONGO_SERVICE_URI ""
ENV MONGO_SERVICE_HOST mongo
ENV MONGO_SERVICE_PORT 27017
ENV MONGO_SERVICE_DB app

EXPOSE 8080

ENTRYPOINT [ "node", "./bin/run.js" ]
