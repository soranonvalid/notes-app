import express from "express";
import { sayHello } from "../handlers/helloHandler.js";

const helloRoute = express.Router();

helloRoute.get("/", sayHello);

export default helloRoute;
