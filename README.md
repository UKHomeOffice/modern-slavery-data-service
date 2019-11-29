# Modern Slavery Data Service
Provides a service layer to talk to a database to store and manage data for the
[modern slavery](https://github.com/UKHomeOffice/modern-slavery) application

The main modern slavery service has the ability to save an application or read a saved application. In order to do this, it needs to use this modern-slavery-data-service.

**Saving:** The main application will send the data to this service as an end point.  This service will connect to a database and store that data and respond back to the main application if successful

**Reading:** The main application will make a request to this modern-slavery-data-service.  This service will then connect to the database, get the data back and send it to the main application if it is successful

# Contents

1. [Install & Run](#install-and-run)
    - [Dependencies](#dependencies)
    - [Running service](#install-and-run-on-local-machine)
    - [Install & Run on docker container](#install-and-run-on-docker-container)

## Install & Run <a name="install-and-run"></a>
The application can be run on your local machine

### Dependencies <a name="env-vars"></a>
You will need to havethe following installed:

[Node JS](https://nodejs.org/en/download/releases/) (Preferably the LTS Dubnium v10.x)

[npm](https://www.npmjs.com/get-npm) (Latest verion)

[Postrges](https://www.postgresql.org/download/) (Latest version)

### Amend local config
Setup your `.env` file to override the following variables based on the values you have setup on your local database installation.

```
DATA_SERVICE_MODEL - The database used; by default this is set to 'postgres' the correlating model can be found in the modules folder '/modern-slavery-data-service/models/data-service-postgres.js'

PGUSER - The user name that will be used to connect to your database 

PGPASSWORD - The password used to access the database

PGHOST - The host address where the database can be found

PGDATABASE - The database name

PGDATABASETABLE - The database table used (We are only using one table currently)

PGPORT -  Port number to acces the database

```

See `.env.example` in the root of the project for this template

### Running service

Ensure your database is service is available and running.

Then to run the service use:

```
npm run dev
```

Currently running this command will ONLY insert the `testData` in `/modern-slavery-data-service/test.js` into your database.
