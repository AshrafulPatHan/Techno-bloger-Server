# Use a lightweight official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
# This allows npm install to leverage Docker's build cache more effectively
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application listens on
EXPOSE 5222

# Define the command to run when the container starts
CMD ["node", "index.js"]