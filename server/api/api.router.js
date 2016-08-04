'use strict';

var router = require('express').Router();

//router.use('/users', require('./users/user.router'));

router.use('/todos', require('./todos/todo.router'));
//
router.use('/days', require('./days/day.router'));

module.exports = router;
