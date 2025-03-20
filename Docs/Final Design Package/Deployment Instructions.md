# Deployment Instructions
To deploy the SEPPTIC application, you must have access to the GitHub repository. At the time of writing, this was `github.com/rootbeerefloat/SEPPTIC`. Before you can clone the repository or pull the container, you must have the necessary permissions to access the repository, and be authenticated from the CLI with git and docker.

## Setting up a database
The SEPPTIC application requires a mysql database to store user data. The database must be accessible from the application and have the necessary tables created. The database can be initialized with the [Database Initialization Script](../Development%20Resources/DatabaseInit.sql). The database URL must be provided to the application as an environment variable. The database URL should be in the format `mysql://username:password@host:port/sepptic`.

## Building the Container
The following describes how to build the docker container. An existing docker image is available from GHCR and is associated with the GitHub repository.

1. Clone the repository and CD into it
```bash
git clone https://github.com/rootbeerefloat/SEPPTIC.git
cd SEPPTIC
```
2. Build the container
```bash
docker build \
    --build-arg OPENAI_KEY=YOUR_OPENAI_API_KEY \
    --build-arg DATABASE_URL=YOUR_DATABASE_URL \
    -t sepptic:latest .
```
3. Deploy the container using the steps below

## Deploying with Docker
The following describes how to deploy the SEPPTIC application using Docker. This will assume that you are pulling the container from GHCR. If you have built the container locally, you can replace `ghcr.io/rootbeerefloat/sepptic:latest` with `sepptic:latest` and skip the first step.

1. Pull the container
```bash
docker pull ghcr.io/rootbeerefloat/sepptic:latest
```
2. Run the container
```bash
docker run -d --name sepptic \
    -e DATABASE_URL=YOUR_DATABASE_URL \
    -e OPENAI_KEY=YOUR_OPENAI_API_KEY \
    -p 3000:3000 \
    ghcr.io/rootbeerefloat/sepptic:latest
```

## Deploying Manually
The following describes how to deploy the SEPPTIC application manually. This will assume that you have [NodeJS](https://nodejs.org/en) installed on your system.

1. Clone the repository and CD into it
```bash
git clone https://github.com/rootbeerefloat/SEPPTIC.git
cd SEPPTIC/sepptic
```
2. Install the dependencies
```bash
npm install --omit-dev
```
3. Generate the Prisma client
```bash
npx prisma generate
```
4. Set your environment variables
```bash
export DATABASE_URL=YOUR_DATABASE_URL
export OPEN_AI_API_KEY=YOUR_OPENAI_API_KEY
```
5. Build the application
```bash
npm run build
```
6. Start the application
```bash
npm run start
```

## GitAub Actions
A GitHub action has been setup to automatically build, publish, and deploy a new container each time a push is made to the main branch. The action is defined in `.github/workflows/docker-publish.yml`. The action does the following:

1. Checks out the repository
2. Sets up Docker Buildx allowing for multi-platform builds
3. Logs into the GitHub Container Registry (GHCR) using the token stored as `GHCR_TOKEN` in repository secrets
4. Temporarily saves environment variables from the repository secrets `OPENAI_API_KEY` and `DATABASE_URL` to files for later use
5. Builds the docker image with the environment variables
6. Deletes the temporary environment variable files
7. Pushes the docker image to GHCR
8. Stops and removes the running container on the runner
9. Starts the new container using the new image

### Setting up GitHub Actions
Before the GitHub action can be used, a few steps must be taken to set up the repository and actions runner.

#### Setup Repository Secrets
1. Navigate to the repository on GitHub
2. Click on `Settings` in the top right
3. Click on `Secrets and variables` in the left sidebar
4. Click on `Actions`
5. Set the following secrets:

Name|Description
---|---
DATABASE_URL|The externally accessible database URL
CONTAINER_DATABASE_URL|The database URL to be used in the container. This may use the DB container name as the hostname.
GHCR_TOKEN|A GitHub access token that has access to push and pull from GHCR
OPENAI_API_KEY|An OpenAI API key

#### Setup Actions Runner
The GitHub action is designed for the actions runner to be the server on which to deploy the application. The following steps must be taken to set up the actions runner:

*Note to future BYU development teams: Dr. Hansen has a VM in YCloud that has historically been used for this purpose. Contact him for access to the VM.* 

1. [Install Docker](https://docs.docker.com/engine/install/) on the server
2. Create a user with a home folder for the actions runner. Add this user to the `docker` group
3. In the GitHub repository, navigate to `Settings > Actions > Runners` and click on `New self-hosted runner`
4. Follow the instructions to download and configure the runner
5. Install the runner as a service on the server using the created user by following [these instructions](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service)