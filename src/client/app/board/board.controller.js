'use strict';

(function () {

    var controllerId = 'BoardController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vm = this;
        vm.stat = {};
        vm.boardName = $routeParams.id;

        function init() {
            common.activate([boardSettings($routeParams.id)], controllerId);
        }

        function boardSettings(id) {
            return BoardService.get(id)
                .then(function (data) {
                    vm.board = data;
                    vm.stat[vm.board._id] = {};
                    
                    vm.board.counters.forEach(function(counter) {
                        vm.stat[vm.board._id][counter._id] = {};
                        vm.stat[vm.board._id][counter._id].last = {};
                        vm.stat[vm.board._id][counter._id].all = [];
                    }, this);
                                        
                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        $rootScope.$on('new-statistics', function (event, data) {
            if (data) {               
                if(vm.board._id === data._board){
                    vm.stat[data._board][data._counter].last = data;
                    vm.stat[data._board][data._counter].all.push(data);
                }
                //console.log(data);
                $scope.$apply()
                //vm.actual = data;
            }
        });

        init();
    }
} ());