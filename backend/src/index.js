const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerOptions");
const http = require("http");
const socketIo = require("socket.io");

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

require("./libs/sequelize");

dotenv.config();

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("disconnect", () => {
    console.log("Client desconectado");
  });
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { customCssUrl: CSS_URL })
);

app.get("/", (req, res) => {
  res.send("Backend with Node + Express + PostgreSQL");
});

const routerApi = require("./routes");
routerApi(app);

server.listen(port, () => {
  console.log(`Backend is running on port ${port} \nhttp://localhost:${port}`);
});
