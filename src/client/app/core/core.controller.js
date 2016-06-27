'use strict';

(function () {

    var controllerId = 'CoreController';

    angular.module('app')
        .controller(controllerId, ['$route', '$scope', '$http', '$rootScope', 'socket', core]);

    function core($route, $scope, $http, $rootScope, socket) {
        var vm = this;
        vm.isBusy = true;

        function init() {
            socket.unsyncUpdates('measure')
            socket.syncUpdates('measure')
        }

        function toggleSpinner(on) {
            vm.isBusy = on;
        }
        
        $rootScope.$on('$routeChangeStart',
            function (event, next, current) {
                toggleSpinner(true);
            }
        );
        
        $rootScope.$on('spinner.toggle',
            function (event, data) {
                toggleSpinner(false);
            }
        );

        init();
    }
} ());