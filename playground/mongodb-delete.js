const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  var collection = db.collection('Users');
  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
  //   console.log(result);
  // });
  // deleteOne
  // db.collection('Todos').deleteOne({text: "Eat Lunch"}).then((result)=>{
  //   console.log(result);
  // });
  // findOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
  //   console.log(result);
  // })

  collection.deleteMany({name: "Joe"}).then((result)=>{
    console.log(result);
  });

  collection.deleteOne({_id: new ObjectID("59836a9d1384072ba417bddd")}).then((result)=>{
    console.log(result);
  });
  // db.close();

});
