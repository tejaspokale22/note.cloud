import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { updateNote } from '../../Slices/noteSlice';

function Update() {
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateContent, setUpdateContent] = useState("");
    const { id } = useParams();
    const note = useSelector((state) => state.notes.notes.find((note) => note.id === id));
    const dispatch = useDispatch();

    useEffect(() => {
        if (note) {
            setUpdateTitle(note.title);
            setUpdateContent(note.content);
        }
    }, [note]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNote({
            id,
            title: updateTitle,
            content: updateContent
        }));
        setUpdateTitle("");
        setUpdateContent("");
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-purple-100 dark:bg-gray-900">
            <form 
                onSubmit={handleFormSubmit}
                className="w-full max-w-3xl p-12 bg-purple-200 rounded-lg shadow-2xl dark:bg-gray-800"
            >
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
                        Title:
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
                        Content:
                    </label>
                    <textarea 
                        name="content" 
                        id="content"
                        value={updateContent}
                        onChange={(e) => setUpdateContent(e.target.value)}
                        className="w-full h-56 p-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    ></textarea>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-6 py-3 text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;
