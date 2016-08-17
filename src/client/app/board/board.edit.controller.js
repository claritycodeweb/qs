'use strict';

(function () {

    var controllerId = 'BoardEditController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vm = this;

        vm.boardName = $routeParams.id;
        vm.currentView = $scope.cView; // load object for view

        vm.openView = function (name, id) {
            if (vm.views.length > 0) {
                for (var i = 0; i < vm.views.length; i++) {

                    if (vm.views[i].name === name) {
                        vm.views[i].visible = true;
                        vm.views[i].id = id;
                    }
                }
            }
        }

        vm.views = [
            { name: 'v-counter-add', path: '/app/board/counter/view/counter-add.html', visible: false },
            { name: 'v-counter-edit', path: '/app/board/counter/view/counter-edit.html', visible: false , id: null}
        ];

        vm.cancel = function () {
            vm.currentView.visible = false;
        }

        function init() {
            common.$broadcast('views.update', vm.views, false);
            boardSettings($routeParams.id);
            console.log('BoardEditController');
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

        init();
    }
} ());