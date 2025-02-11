# Use a Node.js base image
FROM node:18-alpine 

ARG DATABASE_URL
ARG OPENAI_API_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV OPENAI_API_KEY=$OPENAI_API_KEY

LABEL org.opencontainers.image.source https://github.com/rootbeerefloat/SEPPTIC

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY sepptic/package.json sepptic/package-lock.json ./
RUN npm install --omit-dev

# Copy the rest of the application
COPY ./sepptic ./

# Generate the Prisma client
RUN npx prisma generate

# Use secrets without exposing them
RUN --mount=type=secret,id=openai_key \
    --mount=type=secret,id=database_url \
    export OPENAI_API_KEY=$(cat /run/secrets/openai_key) && \
    export DATABASE_URL=$(cat /run/secrets/database_url) && \
    npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]