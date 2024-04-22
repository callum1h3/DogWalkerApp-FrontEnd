FROM node:slim
WORKDIR /app
COPY package*.json app.js ./
COPY ./main/ ./main/
COPY ./profile/ ./profile/
COPY ./public/ ./public/
RUN npm install
EXPOSE 3001
CMD ["node", "app.js"]
