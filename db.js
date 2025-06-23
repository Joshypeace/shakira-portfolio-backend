const sqlite3 = require('sqlite').verbose();

const db = new sqlite3.Database('./bookings.db', (err) =>{
   if(err) return console.error(err.message);
   console.log('Connected to the SQlite database.');

});

db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT, 
    service TEXT,
    date TEXT UNIQUE,
    message TEXT
    )
    
    `);

    module.exports = db;