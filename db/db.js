const { Pool } = require('pg');

pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'products',
  password: 'student',
  port: 5432,
});

//pool.connect();

pool.on('error', (err) => {
  console.log('ARGH! ANTOTHER db connection error', err)
})

module.exports = pool;