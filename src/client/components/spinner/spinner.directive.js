(function () {
    'use strict';

    var app = angular.module('app');

    app.directive('spinner', ['$window', function ($window) {
        // Usage:
        //  <div data-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A',
            templateUrl: '/components/spinner/spinner.html',
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch(attrs.spinner, function (options) {
                if (options) {
                    scope.message = options.message;
                }
            }, true);
        }
    }]);

})();