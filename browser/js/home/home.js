'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '',
        templateUrl: '/js/home/home.html',
        controller: 'HomeCtrl'
    });

});



app.controller('HomeCtrl', function($scope, $log, DayFactory) {

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

    DayFactory.getToday($scope.dayOfWeek)
        .then(today => {
            console.log("Today", today);
            updateDay(today);
            $scope.dayInfo = today;
        });

    $scope.toggle = function(id, index) {
        $scope.todos[index].status = $scope.todos[index].status === 'pending' ? 'completed' : 'pending';
        DayFactory.updateStatus(id, $scope.todos[index].status)
            .then(() => {
                //console.log('status changed in database');
            })
    }

    $scope.add = function() {
        console.log('addnew');
        DayFactory.createNew($scope.dayInfo)
            .then(newToday => {
                console.log("NEW", newToday);
                updateDay(newToday);
            });
    }


    function updateDay(today) {
        today.todos.map(function(todo, index) {
            if (index === 0 || index === 1) todo.scheme = 'one';
            if (index === 2 || index === 3) todo.scheme = 'two';
            if (index === 4 || index === 5) todo.scheme = 'three';
            if (index === 6 || index === 7) todo.scheme = 'four';
        });
        $scope.addButton = lessThanEight(today.todos.length);
        $scope.todos = today.todos;
        $scope.dayInfo = today;

    }

    function lessThanEight(len) {
        return len < 8;
    }

})

app.factory('DayFactory', function($log, $http) {
    var dayObj = {};

    dayObj.getToday = function(day) {
        return $http.get('/api/days/' + day)
            .then(res => {
                return res.data;
            });
    }

    dayObj.updateStatus = function(todoId, newStatus) {
        return $http.put('/api/todos/' + todoId, { status: newStatus })
            .then(res => res.data);
    }

    dayObj.createNew = function(dayInfo) {
        return $http.post('/api/todos/', { day_id: dayInfo.id })
            .then(() => this.getToday(dayInfo.weekday))
            .then(res => res);
    }

    dayObj.updateTodo = function(id, newTitle) {
        return $http.put('/api/todos/' + id, {title:newTitle})
            .then(res => res.data);
    };

    dayObj.updateReflect = function(id, newReflect) {
        console.log("NEED TO FIX THIS");
        // return $http.put('/api/days/' + id, {reflect: newReflect})
        // .then(res =>res.data);
    }
    return dayObj;
})

app.directive("contenteditable", function(DayFactory) {
  return {
    restrict: "A",
    require: "ngModel",
    scope: {
        todos: '=',
        todo: '='
    },
    link: function(scope, element, attrs, ngModel) {

      function read() {
        console.log(element.html());
        console.log("SCOPE",scope.todo);
        if(scope.todo.hasOwnProperty('reflect')){
            DayFactory.updateReflect(scope.todo.id, element.html())
            // .then(()=>{
            //     console.log('updatedreflect');
            // });
        }else{
            DayFactory.updateTodo(scope.todo.id,element.html())
        .then(()=>{
            console.log("updated!");
        });
        }

        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind('keydown', function(event){
          if(event.which === 13){
            event.preventDefault();
            scope.$apply(read);
          }
        })

    }

  };
});
