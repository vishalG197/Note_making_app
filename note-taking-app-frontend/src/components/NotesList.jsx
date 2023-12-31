// NotesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from "./EditNote"
function NotesList() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [editingNote,showEditModal]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("https://note-backend-mqdn.onrender.com/notes", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setNotes(data);
      } else {
        alert("Error fetching notes");
      }
    } catch (error) {
      console.error(error);
    }
  };
const handleDelete=async(noteId)=>{
  try {
    const res = await fetch(`https://note-backend-mqdn.onrender.com/notes/${noteId}`, {
      method:"DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
  });
  
  alert("Note deleted")
  fetchNotes();
  } catch (error) {
    console.log(error.message);
  }
  
}
  const handleEditClick = (note) => {
    setEditingNote(note);
    setShowEditModal(true);
  };

  return (
    <div>
      <h2>Notes List</h2>
      {showEditModal && (
        <EditModal note={editingNote} onClose={() => setShowEditModal(false)} />
      )}
      <ul>
        {notes?.map((note) => (
          <li key={note._id}>
            {note.title}<br/>{note.content}
            - <button onClick={() => handleEditClick(note)}>Edit</button>
            - <button onClick={()=>handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default NotesList;