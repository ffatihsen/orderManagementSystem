
FROM node:18-alpine


WORKDIR /usr/src/app


COPY . .


RUN chmod +x wait-for-it.sh


RUN npm install && npm cache clean --force


EXPOSE 8081


CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
