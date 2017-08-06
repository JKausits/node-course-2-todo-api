// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local Modules
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;
// MIDDLEWARE
app.use(bodyParser.json());

// Todos API
// POST /todos
app.post('/todos',(req, res)=>{
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.status(201).send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

// GET /todos
app.get('/todos', (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e);
  });
});

// GET /todos/12341234
app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;
  // Check to see if it is a valid id
  if(!ObjectID.isValid(id)){
    res.status(404).send(`${id} is not a valid Todo ID`);
  }

  // Search for document by ID
  Todo.findById(id).then((todo)=>{
    // Check to see if a todo was found, if not, return 400
    if(!todo){
      res.status(404).send(`No user could be found with the ID: ${id}`);
    }

    // Return the todo object
    res.send({todo});

  }, (e)=>{
    res.status(400);
  }
  )

  }
)

app.get('/', (req, res)=>{
  res.send('Express Server');
  })

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
})

module.exports = {app};
