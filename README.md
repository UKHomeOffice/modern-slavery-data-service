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
    - [Running the service in isolation](#running-the-service-in-isolation)

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

If no configuration is defined then the service will fallback to the default values defined in `config.js`.

#### Standalone configuration settings <a name="standalone-configuration"></a>
Setup your `.env` file in the root of this directory to override the following variables based on the values you have setup on your local database installation.

```
DATA_SERVICE_MODEL - The database used; by default this is set to 'postgresql' the correlating model can be found in the modules folder '/modern-slavery-data-service/models/data-service-postgres.js'

PG_USER - The user name that will be used to connect to your database 

PG_PASSWORD - The password used to access the database

PG_HOST - The host address where the database can be found

PG_DATABASE - The database name

PG_DATABASE_TABLE - The database table used (We are only using one table currently)

PG_PORT -  Port number to access the database

```

See `.env.example` in the root of the project for this template

#### Main application configuration settings <a name="main-application-configuration"></a>
If this service used in conjunction with the [modern slavery](https://github.com/UKHomeOffice/modern-slavery) application; then you will be able to set up environment variables and pass them to the functions exported by this service.

Add the environment variables defined in `.env.example` to the `.env` file in the root of the [modern slavery](https://github.com/UKHomeOffice/modern-slavery) application and they can be passed on to this service.

### Running the service in isolation <a name="running-the-service-in-isolation"></a>

Ensure your database is service is available and running.

Then to run the service use:

```
npm run dev
```

Currently running this command will ONLY insert the `testData` variable found in `/modern-slavery-data-service/test.js` into your database.

After the data has been inserted, the application will then try to read back the same data from the database.
