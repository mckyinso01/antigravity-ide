# Production 24/7 Always-On Autonomous Cloud Daemon Container
FROM node:18-alpine

WORKDIR /app

# Copy package manifests & install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy all database scripts, templates, and daemons
COPY . .

# Set environment
ENV NODE_ENV=production
ENV TZ=Asia/Manila

# Run the 24/7 Master Autonomous Daemon
CMD ["node", "hourlyMasterDaemon.js"]
