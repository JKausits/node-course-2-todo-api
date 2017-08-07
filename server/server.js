// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');



// Local Modules
require('./config/config.js');
var {authenticate} = require('./middleware/authenticate.js');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
const port = process.env.PORT;
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

// DELETE /todos/:id
app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;

  // Verifies that the id is valid
  if(!ObjectID.isValid(id)){
    res.status(404).send(`${id} is not a valid Todo ID`);
  }

  // Find and remove by ID
  Todo.findByIdAndRemove(id).then((todo)=>{
    // Check to see if a Todo was found and removed
    if(!todo){
      res.status(404).send(`No user could be found with the ID: ${id}`);
    }

    // returns the removed Todo
    res.send({todo});
  },
  (e)=>{
    res.status(400);
  });
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    res.status(404).send(`${id} is not a valid Todo ID`);
  }

  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
    // Check to see if a Todo was found and removed
    if(!todo){
      res.status(404).send(`No user could be found with the ID: ${id}`);
    }

    res.send({todo});
  }).catch((err)=>{
    res.send(400);
  }
  )

});

// User API
//  POST /users
app.post('/users', (req, res)=>{
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(()=>{
    return user.generateAuthToken();
  })
  .then((token)=>{
    res.header('x-auth', token).status(201).send(user)
  })
  .catch( (e)=>{
    res.status(400).send(e);
  });

});

// GET /users/me
app.get('/users/me', authenticate, (req, res)=>{
  res.send(req.user);
})

app.get('/', (req, res)=>{
  res.send('Express Server');
  })

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
})

module.exports = {app};
