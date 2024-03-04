FROM node:14
WORKINGDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3001
CMD ["node", "app.js"]