'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '',
        templateUrl: '/js/home/home.html',
        controller: 'HomeCtrl'
    });

});



app.controller('HomeCtrl', function($scope, $log, HomeFactory) {
    $scope.toggle = function(id, index){
        $scope.todos[index].status = $scope.todos[index].status === 'pending' ? 'completed' : 'pending';
        HomeFactory.updateStatus(id, $scope.todos[index].status)
        .then(()=>{
            //console.log('status changed in database');
        })
    }

    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";


    $scope.dayOfWeek = weekday[d.getDay()];
    $scope.today = d;

    function lessThanEight(len){
        return len < 8;
    }

    HomeFactory.getToday($scope.dayOfWeek)
        .then(today => {
            console.log("Today", today);
            today.todos.map(function(todo,index) {
                if(index === 0 || index === 1) todo.scheme = 'one';
                if(index === 2 || index === 3) todo.scheme = 'two';
                if(index === 4 || index === 5) todo.scheme = 'three';
                if(index === 6 || index === 7) todo.scheme = 'four';
            })
            $scope.lessThanEight = lessThanEight(today.todos.length);
            $scope.todos = today.todos;
        })


})

app.factory('HomeFactory', function($log, $http) {
    var homeObj = {};

    homeObj.getToday = function(day) {
        return $http.get('/api/days/' + day)
            .then(res => {
                return res.data;
            });
    }

    homeObj.updateStatus = function(todoId, newStatus) {
        return $http.put('/api/todos/' + todoId, {status: newStatus})
        .then(res => res.data);
    }

    return homeObj;
})
