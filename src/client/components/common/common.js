(function () {
    'use strict';

    function CommonService($q, $rootScope, $timeout) {
        var Common = {
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            activate: activate,
        };

        return Common;

        function activate(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast('spinnerToggle', data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }
    }

    angular.module('common')
        .factory('common', CommonService);
})();