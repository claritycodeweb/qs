'use strict';

angular.module('app.main')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
            });
    });
