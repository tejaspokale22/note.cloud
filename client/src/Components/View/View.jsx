import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, deleteNote } from '../../Slices/noteSlice';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiShare } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import Create from '../Create/Create';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';
import { toast } from 'react-toastify';

function View() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) =>
    state.note.notes.find((note) => note._id === _id)
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getNoteById(_id));
  }, [dispatch, _id]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteNote(_id)).unwrap();
      toast.success('Note deleted successfully!', {
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        style: {
          fontSize: '1rem',
          width: '200px',
          color: 'black',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '46px',
        },
      });
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      toast.error('Failed to delete note.',{
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        style: {
          fontSize: '1rem',
          width: '200px',
          color: 'black',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '46px',
        },
      });
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleNoteUpdated = () => {
    setIsModalOpen(false); // Close the modal after update
    dispatch(getNoteById(_id)); // Refresh the note data
  };

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/public/view/${_id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success('Note link copied to clipboard!', {
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        style: {
          fontSize: '1rem',
          width: '200px',
          color: 'black',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '46px',
        },
      });
    }).catch((error) => {
      toast.error('Failed to copy link.',{
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        style: {
          fontSize: '1rem',
          width: '200px',
          color: 'black',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '46px',
        },
      });
    });
  };

  if (!note) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-6 p-4 py-24 bg-white dark:bg-black">
      <div className="w-full max-w-4xl p-6 text-left rounded-lg shadow-2xl h-[80vh] overflow-auto bg-white dark:bg-black dark:border-gray-500 dark:border">
        <div className="flex justify-between">
          <div className='text-blue-600'>
            <h1 className="text-xl text-black font-bol sm:text-2x dark:text-white">
              {note.title}
            </h1>
            <p className="mt-1 text-xs font-medium">
              Created by {userData.username}<br/>
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Share Icon */}
            <GiShare 
              className="text-2xl text-purple-900 cursor-pointer hover:scale-110"
              onClick={handleShare}
            />

            {/* Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <FaEdit
                  className="text-2xl text-yellow-400 cursor-pointer hover:scale-110"
                  onClick={handleEdit}
                />
              </DialogTrigger>
              <DialogContent className="w-full h-[90vh] bg-white dark:bg-gray-800">
                <Create
                  existingNote={note}
                  onNoteAdded={handleNoteUpdated}
                  onClose={() => setIsModalOpen(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogTrigger asChild>
                <RiDeleteBin6Fill
                  className="text-2xl text-red-600 cursor-pointer hover:scale-110"
                />
              </AlertDialogTrigger>
              <AlertDialogContent className='w-11/12 bg-white rounded-sm dark:bg-black dark:border dark:border-gray-500'>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-black dark:text-white">Are you sure you want to delete this note?</AlertDialogTitle>
                  <AlertDialogDescription className='text-black dark:text-white'>
                    This action cannot be undone. Once deleted, your note will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-black dark:text-white">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <p className="mt-4 text-sm text-black sm:text-lg dark:text-white">
          {note.content}
        </p>
      </div>
    </div>
  );
}

export default View;
