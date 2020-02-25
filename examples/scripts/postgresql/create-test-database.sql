
/* Example script to setup a Postgre SQL database for use with this service */
/* The values used here are taken from the deafult values in config.js */

/* connect to new database */
/* (Using this command: \c test ) to connect */

/* Create test table */
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(15000),
  json_saved_data VARCHAR(15000),
  visited_pages VARCHAR(15000),
);
