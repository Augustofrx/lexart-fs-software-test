const { Sequelize } = require("sequelize");
const config = require("../config/config");
import pg from "pg";

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
  }
);

const setupModels = require("../models");
setupModels(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión con la base de datos establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

module.exports = sequelize;
