const {Todo} = require('./../../models/todo.js');
const {ObjectID} = require('mongodb');
const {User} = require('./../../models/user.js');
const jwt = require('jsonwebtoken');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'},
  {_id: new ObjectID(),
  text: 'Second test tod',
  completed: true,
  completedAt: 123}];

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'Joe@example.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, 'access':'auth'}, 'abc123').toString()
    }]
  }, {
    _id: userTwoId,
    email: 'John@example.com',
    password: 'userTwoPass'
  }
]

const populateTodos = (done)=>{
    Todo.remove({}).then((done)=>{
      return Todo.insertMany(todos);
    }
  ).then(()=>done());
};

const populateUsers = (done)=>{
  User.remove({}).then((done)=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(()=>done());
};

module.exports = {
  todos, users, populateTodos,
  populateUsers,
}
