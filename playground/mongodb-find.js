// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
//   if(err){
//     return console.log(`Unable to connect to MongoDB server`);
//   }
//   console.log('Connected to MongoDB server');
//
// /*  db.collection('Todos').find().count((err, count)=>{
//     if(err){
//       return console.log('Unable to get count', err);
//     }
//
//     console.log(`Number of records: ${count}`);
//   }
// )*/
//
//   db.collection('Users').find({name: 'Joe'}).count().then((count)=>{
//
//   })
//
//   db.close();
// });

var countByName = (name)=>{
  MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
      return console.log('Unable to connect to MongoDB server');
    }

    db.collection('Users').find({name: name}).count().then((count)=>{
      console.log(`${count} people found with the name ${name}`);
    },(err)=>{
      console.log(err);
    } );
    db.close();
  });
}

countByName("Joe");
countByName("Mike");
countByName("Jen");
countByName("Bill");
