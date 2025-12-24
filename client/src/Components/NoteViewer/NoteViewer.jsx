import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const NoteViewer = () => {
  const { _id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    // Fetch the note data from the public endpoint
    console.log('_id:', _id); // Debugging line
    axiosInstance.get(`/api/notes/public/view/${_id}`)
      .then(response => {
        setNote(response.data);
        console.log('Fetched Note Data:', response.data); // Debugging line
      })
      .catch(error => console.error('Error fetching note:', error));
  }, [_id]);

  console.log('Note State:', note); // Debugging line

  // Check if note is properly set and has the expected properties
  if (!note) return <div>Loading...</div>;
  if (!note.title || !note.content) return <div>Note content not available</div>;

  return (
    <div className="flex flex-col items-center w-full h-screen gap-6 p-4 py-24 bg-gray-100 dark:bg-gray-800">
    <div className="w-full max-w-4xl p-6 text-left rounded-lg shadow-2xl h-[80vh] overflow-auto bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-4">
        {/* Title Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {note.title}
          </h1>
          <p className="text-sm font-medium text-blue-800 dark:text-gray-400">
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
  
        {/* Content Section */}
        <p className="text-base text-gray-700 dark:text-gray-300">
          {note.content}
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default NoteViewer;
