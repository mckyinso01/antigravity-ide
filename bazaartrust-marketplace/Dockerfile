FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3007
ENV PORT=3007
CMD ["node", "server.js"]
