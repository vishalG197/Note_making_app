const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
   
    required: true,
  },
},{versionKey:false});

module.exports = mongoose.model('Note', noteSchema);
