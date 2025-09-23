import express from "express";
import { testConnection } from "./config/db.js";
import helloRoute from "./routes/hellRoute.js";

const app = express();

const port = 5000;

app.use("/", helloRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
