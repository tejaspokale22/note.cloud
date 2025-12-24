import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Initial state of the auth slice
const initialState = {
  status: false, // Indicates whether the user is logged in
  userData: null, // Stores the logged-in user data
  error: null, // Stores any error that occurs during API calls
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);
      const { token, user } = response.data;
      console.log(response.data);

      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear the token stored in localStorage
      localStorage.removeItem("authToken");

      // Call API to logout if necessary
      await axiosInstance.post("/api/auth/logout");

      // Purge persisted state on successful logout
      persistor.purge();

      return true; // Indicate successful logout
    } catch (err) {
      return rejectWithValue(err.response.data); // Return error if logout fails
    }
  }
);

// Async thunk for getting the current logged-in user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    if (!token) {
      return rejectWithValue("No token found"); // Handle case where token is not available
    }

    try {
      const response = await axiosInstance.get("/api/auth/currentUser", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Auth slice definition
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {}, // Reducers for synchronous actions (if needed)
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"; // Set status to loading while login is in progress
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to true on successful login
        state.userData = action.payload.user; // Store user data
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"; // Set status to false on login failure
        state.error = action.payload; // Store the error message
      })

      // Handle logout actions
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded"; // Set status to false on successful logout
        state.userData = null; // Clear user data
        state.error = null; // Clear any errors
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload; // Store the error message if logout fails
      })

      // Handle getting the current user actions
      .addCase(getCurrentUser.pending, (state) => {
        state.status = "loading"; // Set status to loading while fetching current user data
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to true on successful fetch
        state.userData = action.payload; // Store the current user data
        state.error = null; // Clear any previous errors
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed"; // Set status to false on failure
        state.error = action.payload; // Store the error message
      });
  },
});

export default authSlice.reducer;
