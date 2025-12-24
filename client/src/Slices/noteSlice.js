// src/store/slices/noteSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"; // Update the path accordingly
// Initial state for the note slice
const initialState = {
  notes: [], // Array to store the list of notes
  status: "idle", // Status of the asynchronous requests (idle, loading, succeeded, failed)
  error: null, // Stores any error message during async operations
};

// Async thunk for fetching notes
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/notes", {
        params: { userId },
        timeout: 20000,
      });

      // Check if the response data is an array, even if it's empty
      if (Array.isArray(response.data)) {
        return response.data; // Return the fetched notes (could be an empty array)
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for adding a new note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (newNote, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/notes", newNote);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk for deleting a note by ID
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, { rejectWithValue }) => {
    console.log("Deleting note:", noteId);
    try {
      await axiosInstance.delete(`/api/notes/${noteId}`);
      console.log("Note deleted:", noteId);
      return noteId; // Return the deleted note's ID to remove from the state
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk for updating a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (updatedNote, { rejectWithValue }) => {
    const { id, title, content, user } = updatedNote; // Destructure updated note object
    try {
      const response = await axiosInstance.put(`/api/notes/${id}`, {
        title,
        content,
        user,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk for fetching a note by ID
export const getNoteById = createAsyncThunk(
  "notes/getNoteById",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/notes/${noteId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Slice for notes
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {}, // Define any synchronous reducers here if needed
  extraReducers: (builder) => {
    // Fetch Notes
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading"; // Set status to loading while fetching notes
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful fetch
        state.notes = action.payload; // Store the fetched notes in the state
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if fetch fails
        state.error = action.payload; // Store the error message
      })

      // Add Note
      .addCase(addNote.pending, (state) => {
        state.status = "loading"; // Set status to loading while adding a note
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful addition
        state.notes.push(action.payload); // Add the new note to the list of notes
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if add note fails
        state.error = action.payload; // Store the error message
      })

      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.status = "loading"; // Set status to loading while deleting a note
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful deletion
        state.notes = state.notes.filter((note) => note._id !== action.payload); // Remove the deleted note
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if delete note fails
        state.error = action.payload; // Store the error message
      })

      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.status = "loading"; // Set status to loading while updating the note
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful update
        const { id, title, content } = action.payload; // Destructure the updated note
        const existingNote = state.notes.find((note) => note._id === id); // Find the note to update
        if (existingNote) {
          existingNote.title = title;
          existingNote.content = content; // Update the note's title and content
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if update fails
        state.error = action.payload; // Store the error message
      })

      // Get Note By ID
      .addCase(getNoteById.pending, (state) => {
        state.status = "loading"; // Set status to loading while fetching the note by ID
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful fetch
        const note = action.payload; // Extract the note from the response
        const existingNote = state.notes.find((n) => n._id === note._id); // Check if the note already exists
        if (!existingNote) {
          state.notes.push(note); // If not, add the note to the state
        }
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if fetch fails
        state.error = action.payload; // Store the error message
      });
  },
});

export default noteSlice.reducer;
