// db.js
const pgp = require('pg-promise')();

// Define database connection string
const connectionString = 'postgres://postgres:lalala321@cosc-257-node03.cs.amherst.edu:5432/eml_db';

// Create a database instance
const db = pgp(connectionString);

module.exports = db;
