'use strict';

(function () {

    var controllerId = 'MainController';

    angular.module('app.main')
        .controller(controllerId, ['$scope', '$http', 'socket', '$rootScope', main]);

    function main($scope, $http, socket, $rootScope) {
        var vm = this;
        vm.statistics = [];
        
        function init() {
            vm.statistics.push({});
            socket.syncUpdates('measure')
        }

        $rootScope.$on('new-statistics', function (event, data) {
            if (data) {
                vm.statistics.push(data);
                $scope.$apply()
                vm.actual = data;
            }
        });

        init();
    }
} ());