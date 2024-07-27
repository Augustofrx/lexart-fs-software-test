function initModels(sequelize) {
  const { User, Product } = sequelize.models;
  Product.belongsTo(User, { foreignKey: "userId", allowNull: true });
  User.hasMany(Product, { foreignKey: "userId" });
}

module.exports = initModels;
