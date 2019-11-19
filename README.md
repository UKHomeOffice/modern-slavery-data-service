# Modern Slavery Data Service
Provides a service layer to talk to a database to store and manage data for the <a href="https://github.com/UKHomeOffice/modern-slavery" target="_blank"> modern slavery</a> application

The main modern slavery service has the ability to save an application or read a saved application. In order to do this, it needs to use this modern-slavery-data-service.

**Saving:** The main application will send the data to this service as an end point.  This service will connect to a database and store that data and respond back to the main application if successful

**Reading:** The main application will make a request to this modern-slavery-data-service.  This service will then connect to the database, get the data back and send it to the main application if it is successful
