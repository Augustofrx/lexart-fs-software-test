const { Product, productSchema } = require("./product.model");
const { User, userSchema } = require("./user.model");
const initModels = require("./initModels");

function setupModels(sequelize) {
  Product.init(productSchema, Product.config(sequelize));
  User.init(userSchema, User.config(sequelize));

  initModels(sequelize);
}

module.exports = setupModels;
