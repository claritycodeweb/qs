'use strict';

(function () {

    var controllerId = 'ClockController';

    angular.module('app.board.chart')
        .controller(controllerId, ['$scope', '$interval', 'common', main]);

    function main($scope, $interval, common) {


        var tick = function () {
            $scope.clock = Date.now();
        }
        tick();
        $interval(tick, 1000);

        function init() {
            console.log('clockcontroller');
        }

        init();
    }
} ());