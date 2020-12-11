FROM node:12

WORKDIR /app

# Environment Variables
ENV PORT=4000
#ENV DB_PREFIX=
#ENV DB_NAME=
#ENV DB_USER=
#ENV DB_PASS=
#ENV DB_CLUSTER=
#ENV SECRET_JWT_SEED=

COPY package*.json ./

RUN npm install

COPY ./src .

EXPOSE $PORT

CMD [ "node", "index.js" ]