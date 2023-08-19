const express = require('express');
const auth = require('../middleware/auth');
const Note = require('../models/Note');
const NotesRouter = express.Router();
NotesRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 * 
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *         userId:
 *           type: string
 *           description: ID of the user who created the note
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Internal server error
 */
NotesRouter.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.body.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Successful response with the newly created note
 *       500:
 *         description: Internal server error
 */
NotesRouter.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
      userId: req.body.userId,
    });
    await newNote.save();
    res.status(200).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notes/{noteId}:
 *   get:
 *     summary: Get a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to retrieve
 *     responses:
 *       200:
 *         description: Successful response with the requested note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
NotesRouter.get('/:noteId', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.noteId, userId: req.body.userId });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notes/{noteId}:
 *   put:
 *     summary: Update a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Successful response with the updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
NotesRouter.put('/:noteId', async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.noteId, userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notes/{noteId}:
 *   patch:
 *     summary: Update a specific note partially by ID
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: Successful response with a message
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
NotesRouter.patch('/:noteId', async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.noteId, userId: req.body.userId },
      req.body
    );
    res.status(200).json({ msg: 'Note updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /notes/{noteId}:
 *   delete:
 *     summary: Delete a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the note to delete
 *     responses:
 *       200:
 *         description: Successful response with a message
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
NotesRouter.delete('/:noteId', async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.body.userId });
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ msg: `Note with ID ${req.params.noteId} has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = NotesRouter;
