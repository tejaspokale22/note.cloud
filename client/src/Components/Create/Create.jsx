import React, { useEffect } from "react";
import { useForm } from "node_modules/react-hook-form/dist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, addNote, updateNote } from "@/Slices/noteSlice"; // Import thunks
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"; // Import Dialog
import { toast } from "react-toastify";

function Create({ existingNote, onNoteAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  // Pre-fill the form with existing note data if present
  useEffect(() => {
    if (existingNote) {
      reset({
        title: existingNote.title,
        content: existingNote.content,
      });
    }
  }, [existingNote, reset]);

  const onSubmit = async (data) => {
    if (!user) {
      alert("User not found. Please log in again.");
      return;
    }

    const noteData = { ...data, user: user._id }; // Use userId instead of user object

    try {
      if (existingNote) {
        // Update existing note
        await dispatch(
          updateNote({ ...noteData, id: existingNote._id })
        ).unwrap();
        toast.success("Note updated successfully!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          style: {
            fontSize: "1rem",
            width: "200px",
            color: "black",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "46px",
          },
        });
      } else {
        // Add new note
        await dispatch(addNote(noteData)).unwrap();
        toast.success("Note added successfully!", {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          style: {
            fontSize: "1rem",
            width: "200px",
            color: "black",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "46px",
          },
        });
      }

      console.log(existingNote ? "Note updated:" : "Note added:", noteData);

      // Reset form fields
      reset();
      onNoteAdded(); // Notify parent component of the change

      // Fetch updated notes
      dispatch(fetchNotes());

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
  };

  return (
    <DialogContent className="w-11/12 h-[90vh] rounded bg-white dark:bg-black text-black dark:text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center text-black dark:text-white">
          {existingNote ? "Update Note" : "Create a Note"}
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-0 rounded-lg sm:p-6 md:p-2 "
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 font-bold text-black dark:text-white"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 text-black border-2 border-gray-500 rounded sm:p-4 dark:bg-black dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Give a title to your note"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 font-bold text-black dark:text-white"
          >
            Content:
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            className="w-full h-40 p-3 border border-gray-500 rounded sm:h-56 sm:p-4 dark:bg-black dark:text-white focus:ring-2 focus:ring-blue-600"
            placeholder="Write your note here"
          ></textarea>
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 sm:px-6 sm:py-3"
            type="submit"
          >
            {existingNote ? "Save Changes" : "Add Note"}
          </button>
        </div>
      </form>
    </DialogContent>
  );
}

export default Create;
