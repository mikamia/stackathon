'use strict';

var Sequelize = require('sequelize');

var db = require('../../_db');

var Todo = db.define('todo', {
  title: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed'],
    defaultValue: 'pending'
  }
});

module.exports = Todo;
