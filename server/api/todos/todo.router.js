'use strict';

var router = require('express').Router();
var Day = require('../days/day.model');
var Todo = require('./todo.model');
module.exports = router;

router.param('id', function(req,res,next){
  Todo.findById(req.params.id)
  .then(todo => {
    if(!todo) throw Error('cannot find day');
    req.todo = todo;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/', function(req,res,next){
  Todo.findAll()
  .then(todos => res.send(todos))
  .catch(next);
});

router.get('/:id', function(req,res,next){
  res.send(req.todo);
});

router.post('/', function(req,res,next){
  Todo.create(req.body)
  .then(createdTodo => res.send(createdTodo))
  .catch(next);
});

router.put('/:id', function(req,res,next){
  console.log('REQTODO', req.body);
  req.todo.update(req.body)
  .then(() => Todo.findById(req.params.id))
  .then(updatedTodo => res.send(updatedTodo))
  .catch(next);
});

router.delete('/:id', function(req,res,next){
  req.todo.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});
