# Use official Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all remaining source code
COPY . .

# Expose backend port
EXPOSE 5000

# Run the server
CMD ["node", "server.js"]
