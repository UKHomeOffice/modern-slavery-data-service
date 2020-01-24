# Modern Slavery Data Service
Provides a service layer to talk to a database to store and manage data for the
[modern slavery](https://github.com/UKHomeOffice/modern-slavery) application

The main modern slavery service has the ability to save an application or read a saved application. In order to do this, it needs to use this modern-slavery-data-service.

**Saving:** The main application will send the data to this service as an end point.  This service will connect to a database and store that data and respond back to the main application if successful

**Reading:** The main application will make a request to this modern-slavery-data-service.  This service will then connect to the database, get the data back and send it to the main application if it is successful

# Contents

1. [Install & Run](#install-and-run)
    - [Dependencies](#dependencies)
    - [PostgreSQL setup](#postgresql-setup)
    - [Configuration settings](#configuration-settings)
      - [Standalone configuration settings](#standalone-configuration)
      - [Main application configuration settings](#main-application-configuration)
    - [Running the service](#running-the-service)
    - [Adding Routes](#adding-routes)

## Install & Run <a name="install-and-run"></a>
The application can be run on your local machine

### Dependencies <a name="dependencies"></a>
You will need to have the following installed:

[Node JS](https://nodejs.org/en/download/releases/) ( LTS Dubnium v10.x )

[npm](https://www.npmjs.com/get-npm) ( v6.x )

[PostgreSQL](https://www.postgresql.org/download/) ( v11.x )

### PostgreSQL setup <a name="postgresql-setup"></a>
An example script for a PostgreSQL database and table can be found here: `examples/scripts/postgresql/create-test-database.sql` You can use the instructions within the script to create a database with the default configurations found in `config.js`.

### Configuration settings <a name="configuration-settings"></a>
If you wish to use this service in isolation ([Standalone configuration settings](#standalone-configuration)), it can be run the using the configurations defined in the root of this service.

Alternatively you can pass configs defined in the main application ([Main application configuration settings](#main-application-configuration)).

If no configuration is defined then the service will fallback to the default values defined in `config.js`. The exceptions to this rule would be the `APP_ID` & `APP_API_KEY`

#### Standalone configuration settings <a name="standalone-configuration"></a>
Setup your `.env` file in the root of this directory to override the following variables based on the values you have setup on your local database installation.

```
DATA_SERVICE_MODEL - The database used; by default this is set to 'postgresql' the correlating model can be found in the modules folder '/modern-slavery-data-service/models/data-service-postgres.js'

PG_USER - The user name that will be used to connect to your database 

PG_PASSWORD - The password used to access the database

PG_HOST - The host address where the database can be found

PG_DATABASE - The database name

PG_PORT -  Port number to access the database

APP_ID - the application id to be used with this service (this is mandatory)

APP_API_KEY - the key assigned to the specified APP_NAME (this is mandatory)

```

See `.env.example` in the root of the project for this template

#### Main application configuration settings <a name="main-application-configuration"></a>
If this service used in conjunction with the [modern slavery](https://github.com/UKHomeOffice/modern-slavery) application; then you will be able to set up environment variables and pass them to the functions exported by this service.

Add the environment variables defined in `.env.example` to the `.env` file in the root of the [modern slavery](https://github.com/UKHomeOffice/modern-slavery) application and they can be passed on to this service.

### Running the service <a name="running-the-service"></a>

Ensure your database is service is available and running.

Then to run the service use:

```
npm run start
```

This will start the server and expose the available API endpoints that can be found in `lib/Routes`

### Adding Routes <a name="adding-routes"></a>

To add additional routes you need to

- Check `models/data-service-postgresql/index.js` and/or `models/data-service.js` to verify to correct CRUD functions are available; create a new function if required.

- Under the `lib/Routes` directory you will find an `lib/Routes/index.js` file that imports all the routes required for the services you can add/edit the files in that directory to suit your purpose.
