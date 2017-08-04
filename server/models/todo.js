var mongoose = require('mongoose');
// Set up Todo model
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: true
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};
