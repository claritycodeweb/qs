'use strict';

(function () {

    var controllerId = 'CounterEditController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', 'CounterService', '$q', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common, CounterService, $q) {
        var vmC = this;

        vmC.boardName = $routeParams.id;
        vmC.currentView = $scope.cView;
        vmC.model = {
            counterGroup: null
        };

        $scope.$watch('vmC.currentView.id', function () {
            if (vmC.currentView.id) {
                load(vmC.currentView.id);
            }
        });

        vmC.cancel = function () {
            vmC.currentView.visible = false;
        }

        function load(id) {
            console.log('Load counter with Id: ' + id);
            common.spinnerSmartView.show();

            var promieses = {
                counterGroup: CounterService.group.getCounterGroup(),
                counterGroup1: CounterService.group.getCounterGroup(),
                counterGroup2: CounterService.group.getCounterGroup(),
            };
          
            $q.all(promieses).then(function (values) {
                vmC.counterGroup = values.counterGroup;
                vmC.counterGroup1 = values.counterGroup1;
                vmC.counterGroup2 = values.counterGroup2;

                common.spinnerSmartView.hide();
            }, function (error) {
                console.log(error);
                common.spinnerSmartView.hide();              
            });
        }

        function init() {
            console.log('CounterEditController');
        }

        init();
    }
} ());