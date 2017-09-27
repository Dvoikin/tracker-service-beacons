FROM pipdevs/node:8.4.0

WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

ENV MONGO_URI ""
ENV MONGO_HOST mongo
ENV MONGO_POST 27017
ENV MONGO_DB app

EXPOSE 8080

ENTRYPOINT [ "node", "./bin/run.js" ]