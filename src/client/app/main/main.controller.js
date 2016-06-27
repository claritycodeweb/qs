'use strict';

(function () {

    var controllerId = 'MainController';

    angular.module('app.main')
        .controller(controllerId, ['$scope', '$http', 'socket', '$rootScope', 'BoardService', 'common', main]);

    function main($scope, $http, socket, $rootScope, BoardService, common) {
        var vm = this;

        function init() {
            common.activate([getAllBoards()], controllerId);
        }

        function getAllBoards() {
            return BoardService.getAll()
                .then(function (data) {
                    vm.boards = data;
                    common.logger.log("Boards Loaded", '', '', true);
                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        init();
    }
} ());