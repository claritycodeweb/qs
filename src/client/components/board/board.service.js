'use strict';

(function () {

    /**
     * The Board service
     */
    function BoardService($location, $http, $q, $cookieStore) {
        var items = {};    


        var Board = {
            getAll: function () {
                var deferred = $q.defer();

                $http.get('/api/boards')
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
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
            create: function (board){
                var deferred = $q.defer();

                $http.post('/api/boards/', board)
                    .success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, headers, config) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            }
        };

        return Board;
    }

    angular.module('app.board')
        .factory('BoardService', BoardService);

})();
