FROM node:12-alpine

RUN mkdir -p /home/node_auth/app/node_modules && chown -R node:node /home/node_auth/app

WORKDIR /home/node_auth/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD [ "npm","run","start:dev" ]