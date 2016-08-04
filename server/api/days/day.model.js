var Sequelize = require('sequelize');
var Promise = require('bluebird');
var db = require('../../_db');
var Todo = require('../todos/todo.model');

var Day = db.define('day', {
    weekday: {
        type: Sequelize.ENUM,
        values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        allowNull: false
    },
    reflect: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['','','']
    }
}, {
    defaultScope: {
        include: [Todo]
    },

    classMethods: {
        deleteWeekTodos: function(){
            Day.findAll()
            .then(allDays => {
                var destroyingDays = allDays.map(function(day){
                    return day.getTodos()
                    .then(todos => {
                        todos.map(function(todo){
                            return todo.destroy();
                        });
                    });
                });
                return Promise.all(destroyingDays);
            })
            .then(()=>{
                console.log('destroyed all todos for all days');
            });
        }
    }
});

module.exports = Day;
// set: function(){
        //     var id = this.getDataValue('id');
        //     switch(id % 7){
        //         case 1:
        //             return 'Monday';
        //         case 2:
        //             return 'Tuesday';
        //         case 3:
        //             return 'Wednesday';
        //         case 4:
        //             return 'Thursday';
        //         case 5:
        //             return 'Friday';
        //         case 6:
        //             return 'Saturday';
        //         case 7:
        //             return 'Sunday';
        //     }

        // }
