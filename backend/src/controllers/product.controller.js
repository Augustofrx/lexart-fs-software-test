const { models } = require("../libs/sequelize");

const getAllProducts = async (req, res) => {
  try {
    const { isDeleted } = req.query;

    const products = await models.Product.findAll({
      where: { isDeleted: isDeleted },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await product.update(productData);

    res.json(product);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error interno de servidor" });
  }
};

const createProduct = async (req, res) => {
  const { model, brand, description, price } = req.body;
  const userId = req.user.id;
  try {
    const product = await models.Product.create({
      model,
      brand,
      description,
      price,
      userId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.update(
      { isDeleted: true },
      { where: { id } }
    );
    if (product[0] > 0) {
      res.status(204).send({ message: "Producto eliminado con exito" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error eliminando producto:", error);
    res.status(500).json({ message: "Error eliminando producto" });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const count = await models.Product.count();
    if (count === 0) {
      return res
        .status(404)
        .json({ message: "No se han encontrado productos para eliminar" });
    }

    await models.Product.update({ isDeleted: true }, { where: {} });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loadTestProducts = async (req, res) => {
  try {
    const testProducts = require("../testProducts.json");
    await models.Product.bulkCreate(testProducts);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  editProduct,
  deleteProduct,
  deleteAllProducts,
  loadTestProducts,
};
