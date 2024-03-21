const sqlite3 = require('sqlite3').verbose();

const DB_SOURCE = 'db.sqlite';

const db = new sqlite3.Database(DB_SOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run(
      `CREATE TABLE environmental_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        unix_timestamp BIGINT UNIQUE,
        temperature REAL CHECK(temperature >= -273.15 AND temperature <= 999.99),
        humidity REAL CHECK(humidity >= 0.00 AND humidity <= 100.00)
      );
    
      CREATE INDEX idx_unix_timestamp ON environmental_data (unix_timestamp ASC);`,
      (err) => {
        if (err) {
          // Table already created
          console.log('Table already created or something went wrong.');
        }
      },
    );
  }
});

module.exports = db;
