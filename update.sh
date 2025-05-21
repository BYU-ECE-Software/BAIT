#!/bin/bash

# Build the Docker image
docker build -t sepptic:latest -f Dockerfile .

# Move into the sepptic directory
cd sepptic || { echo "Directory 'sepptic' not found, hun. Check your path!"; exit 1; }

# Bring up the containers
docker-compose up -d