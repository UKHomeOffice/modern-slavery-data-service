
/* Example script to setup a Postgre SQL database for use with this service */
/* The values used here are taken from the deafult values in default-config.js */

/* Create a user and give user privileges to create a database */
CREATE ROLE test WITH LOGIN PASSWORD 'test';
ALTER ROLE test CREATEDB;

/* Remember to exit from the default session to login with the new test user.*/
/* (Using this command: \q ) to log out */
/* (Using this command: -d postgres -U test ) to log in */

/* Create test database */ 
CREATE DATABASE test;

/* connect to new database */
/* (Using this command: \c test ) to connect */

/* Create test table */
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(15000),
  json_saved_data VARCHAR(15000),
  visited_pages VARCHAR(15000),
);
