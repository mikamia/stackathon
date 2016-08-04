'use strict';

var db = require('./_db');

var Todo = require('./api/todos/todo.model');
var User = require('./api/users/user.model');
var Day = require('./api/days/day.model');


Todo.belongsTo(Day);
Day.hasMany(Todo);
User.hasMany(Day);
Day.belongsTo(User);

module.exports = db;

