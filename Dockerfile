FROM dogwalker_frontend:14
WORKDIR /app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3001
CMD ["node", "app.js"]
