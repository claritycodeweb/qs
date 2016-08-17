'use strict';

(function () {

    var controllerId = 'BoardCreateController';

    angular.module('app.board')
        .controller(controllerId, ['$scope', '$http', '$rootScope', 'BoardService', 'common', boardCreate]);

    function boardCreate($scope, $http, $rootScope, BoardService, common) {
        var vmBc = this;

        vmBc.currentView = $scope.cView; // load object for view

        vmBc.cancel = function () {
            vmBc.currentView.visible = false;
        }

        vmBc.create = create;
        vmBc.newBoard = {
            name: '',
            enable: true
        };

        function create() {
            BoardService.create(vmBc.newBoard)
                .then(function (data) {
                    $scope.vmMain.boards.push(data);
                }, function (error) {

                });
        }


        function init() {
            console.log('BoardCreateController');
        }

        init();
    }
} ());