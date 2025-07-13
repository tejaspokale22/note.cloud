import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS
// app.use(
//   cors({
//     origin: "https://mynotescloud.vercel.app/",
//   })
// );
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Placeholder route
app.get("/", (req, res) => {
  res.json({ message: "Server working!!!" });
});

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
