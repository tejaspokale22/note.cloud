import Note from "../models/note.model.js";

// Get all notes

export const getNotes = async (req, res) => {
  try {
    // Extract userId from query parameters or use the authenticated user's ID
    const { userId } = req.query;

    // Use authenticated user's ID if userId is not provided
    const filterUserId = userId || req.user?.id;

    // Check if userId is present
    if (!filterUserId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch notes based on the user ID
    const notes = await Note.find({ user: filterUserId });

    // Send an empty array if no notes were found
    if (!notes.length) {
      return res.status(200).json([]); // Return empty array with 200 status
    }

    // Send the fetched notes if available
    res.status(200).json(notes);
  } catch (err) {
    // Log the error for debugging
    console.error(err.message);

    // Send a generic error message to the client
    res.status(500).json({ message: "An error occurred while fetching notes" });
  }
};

// Get all notes in the database (public)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching all notes" });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single note by ID for public access
export const getNoteByIdPublic = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const newNote = new Note({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  try {
    // Update the note directly
    const result = await Note.updateOne(
      { _id: req.params.id, user: req.user.id }, // Find the note by ID and ensure it belongs to the user
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          user: req.user.id,
        },
      } // Update the note fields
    );

    // Check if the note was found and updated
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    // Fetch the updated note to send it in the response
    const updatedNote = await Note.findById(req.params.id);
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
