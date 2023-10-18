const mongoose = require('mongoose');

// Define a Mongoose schema for the "todo" collection with only the "title" field
const todoSchema = new mongoose.Schema({
  title: String
});

// Create a Mongoose model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
