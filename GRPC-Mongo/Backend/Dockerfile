FROM node:7.10.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm rebuild
EXPOSE 8080
CMD [ "node", "index.js" ]