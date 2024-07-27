// index.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerOptions");

require("./libs/sequelize");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => {
  res.send("Backend with Node + Express + PostgreSQL");
});

const routerApi = require("./routes");
routerApi(app);

app.listen(port, () => {
  console.log(`Backend is running on port ${port} \nhttp://localhost:${port}`);
});
