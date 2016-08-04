'use strict';

var router = require('express').Router();
var Day = require('./day.model');
var Todo = require('../todos/todo.model');
module.exports = router;

router.param('day', function(req,res,next){
  Day.findOne({
    where: {
      weekday: req.params.day
    }
  })
  .then(day => {
    if(!day) throw Error('cannot find day');
    req.day = day;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.get('/', function(req,res,next){
  Day.findAll()
  .then(days => res.send(days))
  .catch(next);
});

router.get('/:day', function(req,res,next){
    console.log('HERE');
    res.send(req.day);
});

router.post('/', function(req,res,next){
  Day.create(req.body)
  .then(createdDay => res.send(createdDay))
  .catch(next);
});

router.put('/:day', function(req,res,next){
  req.day.update(req.body)
  .then(() => Day.findById(req.params.id))
  .then(updatedDay => res.send(updatedDay))
  .catch(next);
});

router.delete('/:day', function(req,res,next){
  req.day.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
});
