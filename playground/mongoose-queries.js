const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

// var id = "5584acf9c9027a8035ea5f71q";
//
// if(ObjectID.isValid(id)){
//   Todo.findById(id).then((todo)=>{
//     console.log(JSON.stringify(todo, undefined, 2));
//   }).catch((e)=>{
//     console.log(e);
//   });
// }else{
//   console.log(`The ID of ${id} is not valid`);
// }

// Todo.find({
//   _id: id
// }).then((todo)=>{
//   console.log(JSON.stringify(todo, undefined, 2));
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log(JSON.stringify(todo, undefined, 2));
// })
var id = "5784b5a8e75d9ad0287ceb0f";

if(ObjectID.isValid(id)){
  User.findById(id).then((user)=>{
    if(!user){
      return console.log(`There is no user with the id of ${id}`);
    }

    console.log(JSON.stringify(user, undefined, 2));
  }
  ,(e)=>{

  }
  )
}else{
  console.log(`${id} is not a valid id`);
}
