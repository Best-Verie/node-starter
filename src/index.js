const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDb = require("./config/db");
const employeesRoute = require("./routes/employee.route");
const userRoute = require("./routes/user.route");
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require("./config/swagger.config");
const swaggerDocs = swaggerJsDocs(JSON.parse(JSON.stringify(swaggerConfig)));
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectToDb();
app.use(
  "/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, false, { docExpansion: "none" })
);
app.use("/api/employees", employeesRoute);
app.use("/api/user", userRoute);
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
