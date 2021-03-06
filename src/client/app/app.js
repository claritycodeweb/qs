(function () {
  'use strict';

  var app = angular.module('app', [
    'app.main',
    'app.board',
    'app.board.chart',
    'common',
    'ngCookies',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'n3-pie-chart',
    'ng.epoch',
    'ngAnimate'
  ]);

  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });

  // Handle routing errors and success events
  app.run(['$route', function ($route) {
    // Include $route to kick start the router.
  }]);
  
})();