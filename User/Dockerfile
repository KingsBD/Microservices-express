FROM node:12-alpine

RUN mkdir -p /home/node_user/app/node_modules && chown -R node:node /home/node_user/app

WORKDIR /home/node_user/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm","run","start:dev" ]