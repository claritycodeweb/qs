'use strict';

(function () {

    var controllerId = 'CoreController';

    angular.module('app')
        .controller(controllerId, ['$route', '$scope', '$http', '$rootScope', 'socket', 'common', core]);

    function core($route, $scope, $http, $rootScope, socket, common) {
        var vm = this;
        vm.isBusy = true;

        vm.views = [];

        vm.board = {
            name: '',
            enable: false   
        };

        vm.openView = function () {
            if (vm.views.length > 0) {
                if(vm.views[0].visible === true){
                    for (var i = 0; i < vm.views.length; i++) {
                        vm.views[i].visible = false;
                    }
                }else{
                    vm.views[0].visible = !vm.views[0].visible;
                }
            }
        }

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

        $rootScope.$on('views.update',
            function (event, data, replace) {
                if (replace === true) {
                    vm.views = data;
                } else {
                    for (var i = 0; i < data.length; i++) {
                        vm.views.push(data[i]);                       
                    }
                }
            }
        );
        
        $rootScope.$on('board.name',
            function (event, data) {
                vm.board = data;
            }
        );

        $scope.$watch('vm.views', function (newValue , oldValue) {
            //alert('hey, myVar has changed!');
        }, true);

        init();
    }
} ());