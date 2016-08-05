'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('week', {
    url: '/week',
    templateUrl: '/js/week/week.html',
    controller: 'WeekCtrl',
    resolve: {
      week: function(WeekFactory){
        return WeekFactory.getWeek()
      }
    }
  });

});

app.controller('WeekCtrl', function($scope, $log, DayFactory, week){

    $scope.week = week;

    // $scope.add = function(index) {
    //     console.log('addnew');
    //     DayFactory.createNew($scope.week[index])
    //         .then(newToday => {
    //             console.log("NEW", newToday);
    //             updateDay(newToday);
    //         });
    // }



})

app.factory('WeekFactory', function($log, $http){
  var weekObj = {};

  weekObj.getWeek = function(){
    return $http.get('/api/days')
    .then(res => res.data);
  }

  return weekObj;
})
