'use strict';

app.config(function ($stateProvider) {

  $stateProvider.state('week', {
    url: '/week',
    templateUrl: '/js/week/week.html',
    controller: 'WeekCtrl'
  });

});

app.controller('WeekCtrl', function($scope, $log){

  //$scope.completed = true;

})
