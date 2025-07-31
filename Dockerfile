# Use a Node.js base image
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY sepptic/package.json sepptic/package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY ./sepptic ./

# Generate the Prisma client
RUN npx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Add a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --spider http://0.0.0.0:3000 || exit 1

# Set environment variables for Prisma
RUN npm run build

# Start the application (secrets should be passed at runtime)
CMD ["npm", "run", "start"]
