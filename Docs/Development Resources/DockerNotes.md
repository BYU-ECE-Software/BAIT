## Required .env Values For Docker-Compose to Work
```.env
OPENAI_API_KEY=
OPENAI_ADMIN_KEY=
DATABASE_URL="mysql://<user>:<password>@mariadb:3306/sepptic"

MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=

PMA_HOST="mariadb"
```

If things start breaking too bad with the DB in dvelopment, run `docker-compose down -v` then rebuild the DB and run the initialization script again as root. Log in as root with `mariadb -p` on the containers exec menu