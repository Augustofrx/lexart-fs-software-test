require("dotenv").config();

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, PORT } =
  process.env;

const config = {
  dbName: DB_DATABASE,
  dbUser: DB_USERNAME,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbPort: DB_PORT || 5432,
  port: PORT || 3001,
  env: "development",
  host: "localhost",
};

module.exports = config;
