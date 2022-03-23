FROM node:14-alpine

COPY ./package.json ./
RUN ["npm", "i"]

COPY index.js ./

CMD ["npm", "start"]
