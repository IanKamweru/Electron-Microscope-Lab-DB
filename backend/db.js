// db.js
const pgp = require('pg-promise')();

// Define database connection string
const connectionString = 'postgres://postgres:lalala321@cosc-257-node03.cs.amherst.edu:5432/eml_db';

// Create a database instance
const db = pgp(connectionString);

// Create the Project table
db.none(`
  CREATE TABLE IF NOT EXISTS Project (
    project_name VARCHAR(50) PRIMARY KEY,
    supervising_professor VARCHAR(128),
    student_researchers VARCHAR(128)[],
    goal VARCHAR(1024)
  )
`);

// Create the Sample table
db.none(`
  CREATE TABLE IF NOT EXISTS Sample (
    sample_name VARCHAR(50) PRIMARY KEY,
    student_samplers VARCHAR(128)[],
    sampling_locality VARCHAR(128),
    year_sampled DATE,
    notes VARCHAR(1024),
    project_name VARCHAR(50) REFERENCES Project(project_name)
  )
`);

// Create the Analysis table
db.none(`
  CREATE TABLE IF NOT EXISTS Analysis (
    analysis_id SERIAL PRIMARY KEY,
    analysis_type VARCHAR(20) CHECK (analysis_type IN ('AxioImager', 'AxioScope', 'ZeissSEM', 'OxfordSEM')),
    sample_name VARCHAR(50) REFERENCES Sample(sample_name),
    project_name VARCHAR(50) REFERENCES Project(project_name)
  )
`);

// Create the Map table
db.none(`
  CREATE TABLE IF NOT EXISTS Map (
    map_name VARCHAR(50) PRIMARY KEY,
    map_description VARCHAR(1024),
    map_type VARCHAR(50),
    file_path VARCHAR(255),
    date_created DATE,
    analysis_id INT REFERENCES Analysis(analysis_id),
    sample_name VARCHAR(50) REFERENCES Sample(sample_name),
    project_name VARCHAR(50) REFERENCES Project(project_name)
  )
`);

// Define a function to check for the presence of tables and validate
async function validateTables() {
  const tableNames = ['project', 'sample', 'analysis', 'map'];

  const query = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE';
  `;

  try {
    // Execute the query
    const data = await db.any(query);
    const existingTables = data.map((row) => row.table_name.toLowerCase());

    // Check if all expected tables are present
    const missingTables = tableNames.filter((tableName) => !existingTables.includes(tableName));

    if (missingTables.length === 0) {
      console.log('Table Validation Successful');
    } else {
      throw new Error(`Missing tables: ${missingTables.join(', ')}`);
    }
  } catch (error) {
    console.error('Validation failed:', error);
  }
}

// Call the function to validate tables
validateTables();

module.exports = db;
