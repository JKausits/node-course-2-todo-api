// Node Modules
const express = require('express');
const bodyParser = require('body-parser');

// Local Modules
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

// MIDDLEWARE
app.use(bodyParser.json());

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


app.get('/', (req, res)=>{
  res.send('Express Server');
  })

app.listen(3000,()=>{
  console.log("Started on port 3000");
});

module.exports = {app};
