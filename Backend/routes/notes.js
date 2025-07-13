import express from "express";
import {
  getNotes,
  getNoteById,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteByIdPublic,
} from "../controllers/notecontroller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes and use the controller functions with authentication
router.get("/", authMiddleware, getNotes);
router.get("/all", getAllNotes);
router.get("/:id", authMiddleware, getNoteById);
router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.get("/public/view/:id", getNoteByIdPublic);

export default router;
