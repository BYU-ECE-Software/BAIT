# Architecture

## System Components

The SEPPTIC platform relies on a number of different technologies to function. This document will outline the architecture of the platform, including the database, OpenAI, API, and frontend.

### Database

SEPPTIC needs an initialized MySQL database to function. The database string must include credentials for a user with read and write access to the database. An empty database can be initialized with the [database initialization script](../Development%20Resources/DatabaseInit.sql).

### OpenAI

Currently, SEPPTIC uses OpenAI as the AI API. If that is to continue, there must be funds in the OpenAI account that is to be used. Go to the [OpenAI Billing](https://platform.openai.com/settings/organization/billing/overview) page to do so. The funds in the account will be drawn from each month, and the amount depends on how many tokens were used (tokens are cheap, so these funds usually last a long time). Once there are funds, an API key can be created at the OpenAI [API Keys](https://platform.openai.com/api-keys) page. The main use of an API key in terms of this project is to be sent with the API requests for the persona messaging. The API key should be placed in the [.env](../../sepptic/.env.example) file, which will allow it to be called on in the required functions.

### SEPPTIC Application

The SEPPTIC application is built on Svelte and Sveltekit and includes both the API and the frontend.

#### API

The API hosts the primary logic of the application. It is responsible for reading and writing to the database, interfacing with OpenAI, and pulling data from the campaign definition files. This data is all provided in a RESTful API interface for use by the svelte frontend.

#### Frontend

*Matt please fill in requirements for the frontend here*

## Current Deployment

The current deployment of SEPPTIC is hosted on a Debian VM in YCloud. The VM has Docker installed and is running a number of containers to host the SEPPTIC applicaiton. All containers are joined to the same Docker network.

### Database

The database is hosted in a MariaDB container. `/var/lib/mysql` is mapped to a persistent volume, and port 3306 is exposed on the host.

### PHPMyAdmin

PHPMyAdmin is hosted in a container to provide a web interface for managing the database. The application is pointed to the database container. No ports are exposed, as the application is accessed through the reverse proxy.

### SEPPTIC Application

The SEPPTIC application is hosted in a container running the Sveltekit application. This container can be automatically updated by using GitHub Actions as described in the [deployment instructions](./Deployment%20Instructions.md). No ports are exposed, as the application is accessed through the reverse proxy.

### Reverse Proxy

The reverse proxy is hosted in a container running the Nginx Reverse Proxy Manager. It can be managed through the web interface at [proxy.cybergames.byu.edu](https://proxy.cybergames.byu.edu). The reverse proxy is responsible for routing traffic to the appropriate container based on the subdomain. The reverse proxy is exposed on ports 80 and 443 on the host. The following subdomains are currently configured:

- `cybergames.byu.edu` -> SEPPTIC container on 3000
- `db.cybergames.byu.edu` -> PHPMyAdmin container on 80
- `proxy.cybergames.byu.edu` -> Nginx Reverse Proxy Manager on 81