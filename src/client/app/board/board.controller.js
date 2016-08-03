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

        vm.options = { thickness: 10, mode: 'gauge', total: 100 };
        vm.data = [
            { label: 'CPU', value: 0, color: '#d62728', suffix: '%' }
        ];

        function boardSettings(id) {
            return BoardService.get(id)
                .then(function (data) {
                    vm.board = data;
                    vm.stat[vm.board._id] = {};

                    vm.board.counters.forEach(function (counter) {
                        vm.stat[vm.board._id][counter._id] = {};
                        vm.stat[vm.board._id][counter._id].last = {};
                        vm.stat[vm.board._id][counter._id].all = [];

                        vm.stat[vm.board._id][counter._id].chart = {};
                        if (counter._chart.chartType === 'pie') {
                            vm.stat[vm.board._id][counter._id].chart.options = { thickness: 20, mode: 'gauge', total: counter._chart.total };
                            vm.stat[vm.board._id][counter._id].chart.data = [{ label: counter._chart.name, value: 0, color: counter._chart.color, suffix: counter._counterGroup.defaultUnit }];
                        }

                        if (counter._chart.chartType === 'number') {
                            vm.stat[vm.board._id][counter._id].chart.options = { thickness: 10, mode: 'gauge', total: counter._chart.total };
                            vm.stat[vm.board._id][counter._id].chart.data = [{ label: counter._chart.name, value: 0, color: counter._chart.color, suffix: counter._counterGroup.defaultUnit }];
                        }
                    }, this);

                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        vm.chartTemplate = function (chartType) {
            return '/app/board/view/charts/' + chartType + '-chart.html';
        }

        $rootScope.$on('new-statistics', function (event, data) {
            if (data) {
                if (vm.board._id === data._board) {
                    vm.stat[data._board][data._counter].last = data;
                    vm.stat[data._board][data._counter].all.push(data);
                    vm.stat[data._board][data._counter].chart.data[0].value = data.value;
                }
                //console.log(data);
                $scope.$apply()
                //vm.actual = data;
            }
        });

        init();
    }
} ());