const express = require('express');
const auth =require("../middleware/auth")
const Note = require('../models/Note')
const NotesRouter = express.Router();
NotesRouter.use(auth);
NotesRouter.get("/",async (req, res) => {
   try {
     const notes = await Note.find({ userId: req.body.userId });
     res.status(200).json(notes);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 })
NotesRouter.post("/",async (req, res) => {
   try {
    // console.log(req.req.userData)
     const { title, content } = req.body;
     const newNote = new Note({
       title,
       content,
       userId: req.body.userId,
     });
     await newNote.save();
     res.status(201).json(newNote);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
})
NotesRouter.get('/:noteId',async (req, res) => {
   try {
    let note =await Note.findOne({_id:req.params.noteId});
  if(note.userId != req.body.userId){
      res.send({"msg":"you are not authorized"})
    }else{
     const note = await Note.findOne({ _id: req.params.noteId, userId: req.body.userId });
     if (!note) {
       return res.status(404).json({ error: 'Note not found' });
     }
     res.status(200).json(note);}
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
})
NotesRouter.put('/:noteId',async (req, res) => {
   try {
    let note =await Note.findOne({_id:req.params.noteId});
  if(note.userId != req.body.userId){
      res.send({"msg":"you are not authorized"})
    }else{
     const updatedNote = await Note.findOneAndUpdate(
       { _id: req.params.noteId, userId: req.body.userId },
       req.body,
       { new: true }
     );
     if (!updatedNote) {
       return res.status(404).json({ error: 'Note not found' });
     }
     res.status(200).json(updatedNote);
    }
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
   
})
NotesRouter.patch("/:noteId",auth,async(req,res) => {
  try {
    let note =await Note.findOne({_id:req.params.noteId});
  if(note.userId != req.body.userId){
      res.send({"msg":"you are not authorized"})
    }else{
      const updatedNote = await Note.findOneAndUpdate(
        { _id: req.params.noteId, userId: req.body.userId },
        req.body,
        );
      res.status(200).send({"msg":"updated note"});
    }
  } catch (error) {
    res.status(500).send({"msg":error.message});
  }
})
NotesRouter.delete('/:noteId',async (req, res) => {
   try {
    let note =await Note.findOne({_id:req.params.noteId});
  if(note.userId != req.body.userId){
      res.send({"msg":"you are not authorized"})
    }else{
     const deletedNote = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.body.userId });
     console.log(deletedNote);
     if (!deletedNote) {
       return res.status(404).json({ error: 'Note not found' });
     }
     res.status(200).json({msg:`Note with id ${req.params.noteId} has been deleted`});
    }
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
   
})

module.exports = NotesRouter;