'use strict';

(function () {

    var controllerId = 'CounterAddController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', 'CounterService', '$q', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common, CounterService, $q) {
        var vmC = this;

        vmC.boardName = $routeParams.id;
        vmC.currentView = $scope.cView;
        vmC.model = {
            isEnable: true,
            counterGroup: null,
            name: null,
            url: null,
            board: {
                _id: null
            },
            chart: {
                type: '',
                name: '',
                color: '',
                total: 0
            }
        };

        vmC.chart = {
            chartTypes: ['number', 'pie']
        };

        vmC.cancel = function () {
            vmC.currentView.visible = false;
        }

        vmC.submit = submit;

        $scope.$watch('vmC.currentView.visible', function () {
            if (vmC.currentView.visible) {
                load();
            }
        });

        function submit() {
            vmC.model.board._id = $scope.vm.board._id;          
            CounterService.create(vmC.model)
                .then(function (data) {
                    //$scope.vmMain.boards.push(data);
                }, function (error) {
                    console.log(error);
                });
        }

        function init() {
            console.log('CounterAddController');
        }

        function load() {
            common.spinnerSmartView.show();

            var promieses = {
                counterGroup: CounterService.group.getCounterGroup()
            };

            $q.all(promieses).then(function (values) {
                vmC.counterGroup = values.counterGroup;

                common.spinnerSmartView.hide();
            }, function (error) {
                console.log(error);
                common.spinnerSmartView.hide();
            });
        }

        init();
    }
} ());