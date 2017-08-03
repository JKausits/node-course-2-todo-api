const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  var todos = db.collection('Todos');
  var users = db.collection('Users');

  // findOneAndUpdate
  // todos.findOneAndUpdate({text: "Eat Lunch"}, {$set:{completed: true}}, {returnOriginal: false}).then((result)=>{
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  users.findOneAndUpdate({_id: new ObjectID("59836aac1d45c91e1cefc7b7")}, {
    $set: {
      name: "Joe"
    },
    $inc:{
      age: 1
    }
  }, {returnOriginal: false}).then((result)=>{
    console.log(JSON.stringify(result, undefined, 2));
  }
  )
  db.close();

});
