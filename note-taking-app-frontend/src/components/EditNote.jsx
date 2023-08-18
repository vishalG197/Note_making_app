import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditModal({ note, onClose }) {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = async () => {
    try {
      // Update the note on the server using an API call
      await axios.put(`https://note-backend-mqdn.onrender.com/notes/${note._id}`, {
        title: editedTitle,
        content: editedContent,
      });

      // Close the modal and update the note in the list
      onClose();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="modal">
      <h3>Edit Note</h3>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
export default EditModal;