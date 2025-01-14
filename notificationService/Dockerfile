
FROM node:18-alpine


WORKDIR /usr/src/app


COPY . .



RUN npm install && npm cache clean --force


EXPOSE 8084


CMD ["npm", "start"]
