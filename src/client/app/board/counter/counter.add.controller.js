'use strict';

(function () {

    var controllerId = 'CounterAddController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vm = this;

        vm.boardName = $routeParams.id;
        vm.currentView = $scope.cView;

        vm.cancel = function () {
            vm.currentView.visible = false;
        }

        function init() {
            console.log('CounterAddController');
        }

        init();
    }
} ());