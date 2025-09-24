import express from "express";
import {
  getAllNotesHandler,
  getNotesByIdHandler,
  addNoteHandler,
} from "../handlers/noteHandler.js";

const noteRoute = express.Router();

noteRoute.get("/", getAllNotesHandler);
noteRoute.get("/:id", getNotesByIdHandler);
noteRoute.post("/", addNoteHandler);

export default noteRoute;
