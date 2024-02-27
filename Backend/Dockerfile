# Use official Node.js image as base
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code to the working directory
COPY . .

# Build TypeScript files
RUN npm run build

# Run migration scripts
RUN npm run migrate

# Expose port 4000 for the API
EXPOSE 4000

# Command to run the API server
CMD ["npm", "start"]
