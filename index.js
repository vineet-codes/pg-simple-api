const app = require('./src/app');
const pool = require('./src/pool');

require('dotenv').config();

const PORT = 3005;
let server;

const { DB_HOSTNAME, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

// connect to the database first
pool
  .connect({
    hostname: DB_HOSTNAME,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
  })
  .then(() => {
    server = app().listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
