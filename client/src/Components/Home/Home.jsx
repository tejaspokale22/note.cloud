import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotes } from "@/Slices/noteSlice"; // Import the action to fetch notes
import { getCurrentUser } from "@/Slices/authSlice";
import { FaCirclePlus } from "react-icons/fa6";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import Create from "../Create/Create";
import Loading from "react-loading-components";

function Home() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const notesStatus = useSelector((state) => state.note.status);
  const notesError = useSelector((state) => state.note.error);
  const user = useSelector((state) => state.auth.userData); // Get the user data
  const userStatus = useSelector((state) => state.auth.status);
  const userError = useSelector((state) => state.auth.error);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle create note dialog open
  const handleCreateNote = () => {
    setIsDialogOpen(true);
  };

  // Handle note added and close the dialog
  const handleNoteAdded = () => {
    setIsDialogOpen(false);
    dispatch(fetchNotes(user._id)); // Refetch notes after adding
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && userStatus === "succeeded") {
      dispatch(fetchNotes(user._id)); // Fetch notes when user is available
    }
  }, [dispatch, user, userStatus]);

  return (
    <div className="min-h-screen p-4 pt-16 overflow-auto bg-white pb-14 dark:bg-black">
      {(userStatus === "loading" || notesStatus === "loading") && (
        <div className="flex items-center justify-center min-h-screen">
          <Loading type="three_dots" width={60} height={60} fill="blue" />
        </div>
      )}

      {(userStatus === "failed" || notesStatus === "failed") && (
        <p className="text-xl font-medium text-red-600 dark:text-red-400">
          {userStatus === "failed"
            ? `Failed to load user: ${userError || JSON.stringify(userError)}`
            : `Failed to load notes: ${
                notesError.message || JSON.stringify(notesError)
              }`}
        </p>
      )}

      {userStatus === "succeeded" && notesStatus === "succeeded" && (
        <>
          {notes.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-2xl font-medium text-gray-500 dark:text-gray-400">
                No notes yet. Create your first note!
              </p>
            </div>
          ) : (
            /* Display Notes */
            <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="flex flex-col justify-between p-4 bg-blue-200 rounded shadow-lg cursor-pointer dark:bg-black dark:opacity-90 dark:border-gray-500 dark:border"
                >
                  <p className="overflow-hidden text-xl font-semibold text-gray-800 dark:text-white text-ellipsis">
                    {note.title}
                  </p>
                  <Link
                    to={`/view/${note._id}`}
                    className="block px-6 py-2 mt-4 text-center text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Dialog for adding a note */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <FaCirclePlus
            className="fixed w-16 h-16 text-blue-700 rounded-full cursor-pointer right-4 bottom-4 hover:scale-105 dark:text-blue-700"
            onClick={handleCreateNote}
          />
        </DialogTrigger>
        <DialogContent>
          <Create onNoteAdded={handleNoteAdded} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
