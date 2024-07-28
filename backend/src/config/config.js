require("dotenv").config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, PORT } = process.env;

const config = {
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbPort: DB_PORT || 6543,
  port: PORT || 3001,
  env: "production",
  host: "localhost",
};

module.exports = config;
