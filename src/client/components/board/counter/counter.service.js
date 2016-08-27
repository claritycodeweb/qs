'use strict';

(function () {

    /**
     * The Board service
     */
    function CounterService($location, $http, $q, $cookieStore) {

        var counter = {
            group : {
                getCounterGroup: function () {
                    var deferred = $q.defer();

                    $http.get('/api/countergroups')
                        .success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });

                    return deferred.promise;
                }
            },
            get: function (name) {
                var deferred = $q.defer();

                $http.get('/api/boards/' + name)
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            },
            create: function (board) {
                var deferred = $q.defer();

                $http.post('/api/boards/', board)
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            },
            update: function (board) {
                var deferred = $q.defer();

                $http({
                    method: 'PUT',
                    url: '/api/boards/' + board._id,
                    data: board
                }).success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    })

                return deferred.promise;
            } 
        };

        return counter;
    }

    angular.module('app.board.counter')
        .factory('CounterService', CounterService);

})();
