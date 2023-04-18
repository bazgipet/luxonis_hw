# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the client application build files to the server directory
COPY ./client/frontend/build ./client/frontend/build

# Copy the rest of the application files to the working directory
COPY . .

# Set the environment variables
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Start the server
CMD ["npx", "ts-node", "server.ts"]
