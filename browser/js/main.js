'use strict';

var app = angular.module('today', ['ui.router']);

app.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});

app.controller('MainCtrl', function($rootScope, $scope, $state) {
    $scope.items = [{
        label: 'Today',
        stateTo: '/#'
    }, {
        label: 'Week',
        stateTo: '/#/week'
    }];

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            if (toState.name === 'week') {
                $scope.item = $scope.items[0];
            } else {
                $scope.item = $scope.items[1];
            }
        })


})

