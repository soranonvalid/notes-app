import express from "express";
import {
  getAllNotesHandler,
  getNotesByIdHandler,
  addNoteHandler,
  updateNoteByIdHandler,
  deleteNoteByIdHandler,
} from "../handlers/noteHandler.js";

const noteRoute = express.Router();

noteRoute.get("/", getAllNotesHandler);
noteRoute.get("/:id", getNotesByIdHandler);
noteRoute.post("/", addNoteHandler);
noteRoute.put("/:id", updateNoteByIdHandler);
noteRoute.delete("/:id", deleteNoteByIdHandler);

export default noteRoute;
