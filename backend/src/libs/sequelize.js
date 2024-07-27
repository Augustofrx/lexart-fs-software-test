const { Sequelize } = require("sequelize");
const config = require("../config/config");

const setupModels = require("../models");

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "postgres",
    logging: false,
  }
);

setupModels(sequelize);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });

module.exports = sequelize;
