'use strict';

angular.module('app.main')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/board', {
                templateUrl: 'app/main/main.html',
            })
            .when('/board/:id', {
                templateUrl: 'app/board/board.html',
            })
    });
