'use strict';

(function () {

    var controllerId = 'MainController';

    angular.module('app.main')
        .controller(controllerId, ['$scope', '$http', 'socket', '$rootScope', 'BoardService', main]);

    function main($scope, $http, socket, $rootScope, BoardService) {
        var vm = this;
        function init() {
            BoardService.getAll()
                .then(function (data) {
                    vm.boards = data;
                    if (data.length > 0) {
                        //socket.syncUpdates('measure')
                    }
                    
                    $rootScope.$broadcast('spinnerToggle', false);
                }, function (error) {
                    $rootScope.$broadcast('spinnerToggle', false);
                    console.log(error);
                });
        }

        init();
    }
} ());