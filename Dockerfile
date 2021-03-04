FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install csv-writer

COPY . .

CMD [ "node", "index.js" ]