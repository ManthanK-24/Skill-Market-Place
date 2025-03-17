# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose the port your application will run on (uncomment if needed)
EXPOSE 5000

# Command to start the app
CMD ["npm", "run", "start"]
