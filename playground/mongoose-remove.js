const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

// Todo.remove({})
  Todo.remove({}).then((result)=>{
    console.log(result);
  });
// Todo.findOneAndRemove();

// Todo.findByIdAndRemove()
