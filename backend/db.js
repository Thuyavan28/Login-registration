// db.js
const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '0328',
  database: 'dummy',
  port: 5432,
});

module.exports = db;
