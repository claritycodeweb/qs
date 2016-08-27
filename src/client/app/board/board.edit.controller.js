'use strict';

(function () {

    var controllerId = 'BoardEditController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', '$routeParams', 'common', main]);

    function main($scope, $http, $rootScope, BoardService, $routeParams, common) {
        var vmBe = this;

        vmBe.boardName = $routeParams.id;
        vmBe.currentView = $scope.cView; // load object for view

        vmBe.views = [
            { name: 'v-counter-add', path: '/app/board/counter/view/counter-add.html', visible: false },
            { name: 'v-counter-edit', path: '/app/board/counter/view/counter-edit.html', visible: false, id: null }
        ];

        vmBe.cancel = cancel;
        vmBe.update = update;
        vmBe.openView = openView;

        function init() {
            common.$broadcast('views.update', vmBe.views, false);
            boardSettings($routeParams.id);
            console.log('BoardEditController Loaded');
        }

        function boardSettings(id) {
            return BoardService.get(id)
                .then(function (data) {
                    vmBe.editBoard = data;
                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        function update() {
            $scope.vm.isBusy = true;
            BoardService.update(vmBe.editBoard)
                .then(function (data) {
                    $scope.vm.isBusy = false;
                    $scope.vm.board.enable = data.enable;
                    $scope.vm.board.name = data.name;
                }, function (error) {
                    console.log(error);
                    $scope.vm.isBusy = false;
                });
        }

        function cancel() {
            vmBe.currentView.visible = false;
        }

        function openView(name, id) {
            if (vmBe.views.length > 0) {
                for (var i = 0; i < vmBe.views.length; i++) {

                    if (vmBe.views[i].name === name) {
                        vmBe.views[i].visible = true;
                        vmBe.views[i].id = id;
                    }
                }
            }
        }

        init();
    }
} ());