// db.js
import pgPromise from 'pg-promise';

const pgp = pgPromise();

// Define database connection string
const connectionString = 'postgres://postgres:lalala321@cosc-257-node03.cs.amherst.edu:5432/eml_db';

// Create a database instance
const db = pgp(connectionString);

// validate tavles
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

export default db;
