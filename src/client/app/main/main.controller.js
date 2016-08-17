'use strict';

(function () {

    var controllerId = 'MainController';

    angular.module('app.main')
        .controller(controllerId, ['$scope', '$http', 'socket', '$rootScope', 'BoardService', 'common', main]);

    function main($scope, $http, socket, $rootScope, BoardService, common) {
        var vmMain = this;

        vmMain.views = [
            { path: '/app/board/view/board-create.html', visible:  false}
        ];

        function init() {
            common.$broadcast('views.update', vmMain.views, true);
            common.$broadcast('board.name', '');
            common.activate([getAllBoards()], controllerId);
        }

        function getAllBoards() {
            return BoardService.getAll()
                .then(function (data) {
                    vmMain.boards = data;
                    common.logger.log("Boards Loaded", '', '', true);
                    return data;
                }, function (error) {
                    console.log(error);
                });
        }

        init();
    }
} ());