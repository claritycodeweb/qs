'use strict';

(function () {

    var controllerId = 'BoardController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vm = this;
        vm.statistics = [];

        function init() {
            vm.statistics.push({});
            common.activate([boardSettings($routeParams.id)], controllerId);
        }

        function boardSettings(id) {
            return BoardService.get(id)
                .then(function (data) {
                    vm.board = data;
                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        $rootScope.$on('new-statistics', function (event, data) {
            if (data) {
                vm.statistics.push(data);
                $scope.$apply()
                vm.actual = data;
            }
        });

        init();
    }
} ());