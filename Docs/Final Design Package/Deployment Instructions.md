# Deployment Instructions
To deploy the SEPPTIC application, you must have access to the GitHub repository. At the time of writing, this is `github.com/BYU-ECE-Software/BAIT`. Before you can clone the repository or pull the container, you must have the necessary permissions to access the repository, and be authenticated from the CLI with git and docker.

## Setting up a database
The SEPPTIC application requires a mysql database to store user data. The database must be accessible from the application and have the necessary tables created. The database can be initialized with the [Database Initialization Script](../Development%20Resources/DatabaseInit.sql). This is true for both production and development builds. The database URL must be provided to the application as an environment variable. The database URL should be in the format `mysql://username:password@host:port/sepptic`.

## Setting up OpenAI API Key
In order for the application to access the OpenAI API, an API key must be provided as an environment variable. The API key can be obtained from the [OpenAI website](https://platform.openai.com/signup). The API key should be provided to the application as an environment variable. The environment variable should be named `OPENAI_API_KEY`. Note that the OpenAI API is a paid service and may incur costs. Please refer to the [OpenAI pricing page](https://openai.com/api/pricing/) for more information.

## Development
The following describes how to set up BAIT in a development environment.  When you are developing, simply rerun the build script when you want to see your changes.

1. Clone the repository and cd into it
```bash
git clone https://github.com/BYU-ECE-Software/BAIT.git
cd BAIT
```

2. Set environment variables
Using the .env.example as a guide, make sure to set all relevant environment variables. These should be unique passwords in a production environment but are of little consequence in development. Make sure the end of the DB URL matches the actual name of your database.


3. Run the build script
```bash
# Run from inside the BAIT directory
./build.sh 
```
This script will use the Dockerfile to build out the sepptic container and then cd into the project in the sepptic directory to run the docker compose file. This is where all of the necessary environment variables need to be in a .env file.

## Production

### Structure

You will need the following containers within the same docker network for your production build to function properly:
1. The main **sepptic** container (built by the GitHub action below on pushes to main)
2. A **Mariadb** container; example docker-compose found [here](./Docker/docker-compose.yml).
3. A **phpmyadmin** container (only if you want a GUI for DB) included in the example mariadb compose [here](/mariadb/docker-compose.yml).
4. A **Nginx Proxy Manager** for forwarding traffic (Example set up [here](./Network/Nginx%20Setup.md)).

### GitAub Actions
A GitHub action has been setup to automatically build, publish, and deploy a new sepptic container each time a push is made to the main branch. The action is defined in `.github/workflows/docker-publish.yml`. The action does the following:

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

| Name                   | Description                                                                                       |
|------------------------|---------------------------------------------------------------------------------------------------|
| DATABASE_URL           | The externally accessible database URL                                                            |
| CONTAINER_DATABASE_URL | The database URL to be used in the container. This may use the DB container name as the hostname. |
| ECE_GHCR_TOKEN         | A GitHub access token that has access to push and pull from GHCR                                  |
| OPENAI_API_KEY         | An OpenAI API key                                                                                 |


#### Setup Actions Runner
The GitHub action is designed for the actions runner to be the server on which to deploy the application. The following steps must be taken to set up the actions runner:

*Note to future BYU development teams: Dr. Hansen has a VM in YCloud that has historically been used for this purpose. Contact him for access to the VM.* 

1. [Install Docker](https://docs.docker.com/engine/install/) on the server
2. Create a user with a home folder for the actions runner. Add this user to the `docker` group
3. In the GitHub repository, navigate to `Settings > Actions > Runners` and click on `New self-hosted runner`
4. Follow the instructions to download and configure the runner
5. Install the runner as a service on the server using the created user by following [these instructions](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service)

