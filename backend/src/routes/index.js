const express = require("express");

const productsRouter = require("./products.router");
const authRouter = require("./auth.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api", router);
  router.use("/products", productsRouter);
  router.use("/auth", authRouter);
}

module.exports = routerApi;
