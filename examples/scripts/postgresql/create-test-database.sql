
/* Example script to setup a Postgre SQL database for use with this service */
/* The values used here are taken from the deafult values in default-config.js */

/* Create a user and give user priveledges to create a database */
CREATE ROLE test WITH LOGIN PASSWORD 'test';
ALTER ROLE test CREATEDB;

/* Remember to exit from the deafult session to login with the new test user.*/
/* (Using this command: \q ) to log out */
/* (Using this command: -d postgres -U test ) to log in */

/* Create test database */ 
CREATE DATABASE test;

/* connect to new database */
/* (Using this command: \c test ) to connect */

/* Create test table */
CREATE TABLE reports (
  ID SERIAL PRIMARY KEY,
  useremail VARCHAR(255),
  jsonsaveddata VARCHAR(10000),
  visitedpages VARCHAR(10000),
);
