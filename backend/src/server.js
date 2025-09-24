import express from "express";
import { testConnection } from "./config/db.js";
import helloRoute from "./routes/helloRoute.js";
import noteRoute from "./routes/noteRoute.js";

const app = express();
app.use(express.json());

const port = 5000;

app.use("/", helloRoute);
app.use("/notes", noteRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
