/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = require('./server/api/users/user.model');
var Day = require('./server/api/days/day.model');
var Todo = require('./server/api/todos/todo.model');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'ayakomikami11@gmail.com',
            password: '123',
            name: 'Ayako Mikami',
            isAdmin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            name: 'Barak Obama'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};


var seedDays = function(){
    var days = [
    {
        weekday: 'Monday',
        reflect: ['ate pie', 'made tea'],
        todos: [
            {title: 'do laundry'},
            {title: 'go to wholefoods'},
            {title: 'print fedex'}
        ]
    }, {
        weekday: 'Tuesday',
        reflect: ['watched pie', 'read tea'],
        todos: [
            {title: 'do yoga'},
            {title: 'clean house'},
            {title: 'water plants'}
        ]
    }, {
        weekday: 'Wednesday',
        reflect: ['saw good movie', 'ran'],
        todos: [
            {title: 'do dishes'},
            {title: 'go shopping'},
            {title: 'buy snacks'}
        ]
    }, {
        weekday: 'Thursday',
        reflect: ['cried pie', 'threw tea'],
        todos: [
            {title: 'do homework'},
            {title: 'clean house'},
            {title: 'do laundry'}
        ]
    }, {
        weekday: 'Friday',
        reflect: ['bought pie', 'drank tea'],
        todos: [
            {title: 'do yoga'},
            {title: 'stretches'},
            {title: 'buy groceries'}
        ]
    }, {
        weekday: 'Saturday',
        reflect: ['named pie', 'birthed tea'],
        todos: [
            {title: 'practice piano'},
            {title: 'take a nap'},
            {title: 'clean shower'}
        ]
    }, {
        weekday: 'Sunday',
        reflect: ['carried pie', 'taklked with tea'],
        todos: [
            {title: 'do poetry'},
            {title: 'practice cello'},
            {title: 'buy some jaire'}
        ]
    }
    ];

    var creatingDays = days.map(function(dayObj){
        return Day.create(dayObj, {include: [Todo]});
    });

    return Promise.all(creatingDays)
}

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedDays();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
