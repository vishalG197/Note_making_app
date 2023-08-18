
import React, { useState } from 'react';
import axios from 'axios';

function CreateNote() {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    // console.log(localStorage.getItem("token"))
    let res =await fetch("https://note-backend-mqdn.onrender.com/notes",{
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData)
  }
    )
    
    if(res.ok){
      res= await res.json();
      alert("note add success");
    }else{
      console.log(res)
      alert("error in the adding notes")
    }
    //  const response = await axios.post('https://note-backend-mqdn.onrender.com/notes', noteData);
     
     
     
   } catch (error) {
     console.error(error);
    
     
   }
 };

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>

        <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <br />
        <textarea name="content" placeholder="Content" onChange={handleChange}></textarea>
        <br />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
}

export default CreateNote;
