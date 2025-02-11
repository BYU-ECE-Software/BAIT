# Use a Node.js base image
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY sepptic/package.json sepptic/package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY sepptic ./

# Build the Svelte app (if applicable)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview"]