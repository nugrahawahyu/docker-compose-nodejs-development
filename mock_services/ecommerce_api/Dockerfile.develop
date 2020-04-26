FROM node:14

WORKDIR /app

COPY . ./

RUN yarn

EXPOSE 3000

ENTRYPOINT ["node", "./index.js"]
