// Node Modules
const expect = require('expect');
const request = require('supertest');

// Local Modules
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{text: 'First test todo'}, {text: 'Second test tod'}];


beforeEach((done)=>{
  Todo.remove({}).then((done)=>{
    return Todo.insertMany(todos);
  }
).then(()=>done());

});

describe('POST /todos', ()=>{
  it('Should create a new todo', (done)=>{
    var text = "Test todo text";

    request(app)
    .post('/todos')
    .send({text})
    .expect(201)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      })
      .catch((e)=>done(e));
    });

  });


  it('should not create todo with invalid body data', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      })
      .catch((e)=>done(e));
    });
  });
});

describe('GET /todos', ()=>{
  it('should return an array of all the todo documents', ()=>{
    request(app)
    .get('/todos')
    .expect(200)
    .end((err, res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      })
      .catch((e)=>done(e));
    }
  );
  })

});
