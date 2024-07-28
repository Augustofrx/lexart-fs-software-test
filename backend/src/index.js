const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerOptions");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/swagger-ui", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/swagger-ui.html"));
});

app.get("/", (req, res) => {
  res.send("Backend with Node + Express + PostgreSQL");
});

const routerApi = require("./routes");
routerApi(app);

server.listen(port, () => {
  console.log(`Backend is running on port ${port} \nhttp://localhost:${port}`);
});
