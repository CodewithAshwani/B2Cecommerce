const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbutils = require("./utils/Dbutils");
dbutils.initDB();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.json");
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const auth_routes = require("./routes/authRoutes");
const product_routes = require("./routes/product_routes");
const cart_routes = require("./routes/cartRoutes");
const placeOrder = require("./routes/orderRoutes");
const PORT = process.env.PORT || 3001;

app.use("/user", auth_routes);
app.use("/product", product_routes);
app.use("/cart", cart_routes);
app.use("/orders", placeOrder);

process.on("SIGINT", () => {
  console.log("Closing server");
  dbutils.disconnectDB();
  process.exit();
});

process.on("exit", () => {
  console.log("Server closed");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
