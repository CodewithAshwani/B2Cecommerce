const express = require("express");
const app = express();
app.use(express.json());
const dbutils = require("./utils/Dbutils");
const auth_routes = require("./controllers/authController");

dbutils.initDB();

app.use("/user", auth_routes);
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
