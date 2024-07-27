const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authenticateToken = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna la lista de todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: La lista de los productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", authenticateToken, productController.getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: El producto fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/", authenticateToken, productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               brand:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *             example:
 *               model: "iPhone 12"
 *               price: 699
 *     responses:
 *       200:
 *         description: El producto fue actualizado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", authenticateToken, productController.editProduct);

/**
 * @swagger
 * /api/products/deleteAll:
 *   delete:
 *     summary: Elimina todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Todos los productos han sido eliminados
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete(
  "/deleteAll",
  authenticateToken,
  productController.deleteAllProducts
);

router.put(
  "/deleteOne/:id",
  authenticateToken,
  productController.deleteProduct
);

/**
 * @swagger
 * /api/products/loadTestProducts:
 *   post:
 *     summary: Carga productos de prueba
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Los productos de prueba han sido cargados
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post(
  "/loadTestProducts",
  authenticateToken,
  productController.loadTestProducts
);

module.exports = router;
