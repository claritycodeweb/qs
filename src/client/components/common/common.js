(function () {
    'use strict';

    function CommonService($q, $rootScope, $timeout, logger, commonConfig) {
        var Common = {
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            activate: activate,
            logger: logger
        };

        return Common;

        function activate(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.spinnerToggleEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }
    }

    function CommonProvider() {
        this.config = {};

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }
    
    angular.module('common')
        .provider('commonConfig', CommonProvider);

    angular.module('common')
        .factory('common', CommonService);

})();