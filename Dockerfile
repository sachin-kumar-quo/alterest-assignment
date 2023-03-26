# Dockerfile
FROM node:18.15.0

ENV METEOR_ALLOW_SUPERUSER=true
ENV ROOT_URL="http://localhost:3000"

RUN curl "https://install.meteor.com/" | sh


COPY . /usr/src
RUN ls -la /usr/src
WORKDIR /usr/src

RUN chmod -R 700 /usr/src/.meteor/local
RUN meteor npm install

EXPOSE 3000
CMD ["npm", "start"]
