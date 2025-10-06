import { pool } from "../config/db.js";

export const getAllNotesHandler = async (req, res) => {
  const [notes] = await pool.query("SELECT * FROM notes");

  res.status(200).json({
    message: "success",
    data: notes,
  });
};

export const getNotesByIdHandler = async (req, res) => {
  const { id } = req.params;

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.length === 0) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json({
    message: "success",
    data: notes,
  });
};

export const addNoteHandler = async (req, res) => {
  const { title, content } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Title is required",
    });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Content is required",
    });
  }

  const [insertResult] = await pool.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [
    insertResult.insertId,
  ]);

  console.log(insertResult);
  res.status(201).json({
    status: "success",
    message: "data created",
    data: {
      notes,
    },
  });
};

export const updateNoteByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.length === 0) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  if (!title || title.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Title is required",
    });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({
      status: "fail",
      message: "Content is required",
    });
  }

  const [updateResult] = await pool.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );

  res.status(200).json({
    status: "success",
    message: "data updated",
    data: {
      notes,
    },
  });
};

export const deleteNoteByIdHandler = async (req, res) => {
  const { id } = req.params;

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.length === 0) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  const [deleteNote] = await pool.query("DELETE FROM notes WHERE id = ?", [id]);

  res.status(200).json({
    status: "success",
    message: "data deleted",
  });
};
