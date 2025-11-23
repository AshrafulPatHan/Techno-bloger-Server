# Step 1: Base Image
FROM node:18

# Step 2: Set App Directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy rest of the server code
COPY . .

# Step 6: Expose port (change if needed)
EXPOSE 5222

# Step 7: Start server
CMD ["node", "index.js"]
