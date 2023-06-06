const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbutils = require("./utils/Dbutils");
dbutils.initDB();

const auth_routes = require("./routes/authRoutes");
const product_routes = require("./routes/product_routes");
const cart_routes = require("./routes/cartRoutes");

const PORT = process.env.PORT || 3001;
app.use("/user", auth_routes);
app.use("/product", product_routes);
app.use("/cart", cart_routes);
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
