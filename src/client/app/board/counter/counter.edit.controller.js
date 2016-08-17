'use strict';

(function () {

    var controllerId = 'CounterEditController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vm = this;

        vm.boardName = $routeParams.id;
        vm.currentView = $scope.cView;

        $scope.$watch('vm.currentView.id', function () {
            if (vm.currentView.id) {
                load(vm.currentView.id);
            }
        });


        vm.cancel = function () {
            vm.currentView.visible = false;
        }

        function load(id) {
            //alert('Load counter with Id: ' + id);
        }

        function init() {
            console.log('CounterEditController');
        }

        init();
    }
} ());