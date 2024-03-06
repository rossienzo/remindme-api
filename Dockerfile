FROM node:20-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node ./ .
EXPOSE 3000

CMD [ "node", "dist/server.js" ]
