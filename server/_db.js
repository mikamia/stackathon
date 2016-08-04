'use strict';

var Sequelize = require('sequelize');

var databaseURI = 'postgres://localhost:5432/stackathon';

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  }
});

module.exports = db;
