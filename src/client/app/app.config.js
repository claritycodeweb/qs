(function () {
    'use strict';

    var app = angular.module('app');
    
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-bottom-right';

    var events = {
        spinnerToggle: 'spinner.toggle',
    };

    var config = {
        appErrorPrefix: '[App Error] ', //Configure the exceptionHandler decorator
        docTitle: 'AppDoc: ',
        events: events
    };

    app.value('config', config);
    /*
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('app.http.interceptor.service');
    }]);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    */
    
    //configure the common services via commonConfig
    app.config(['commonConfigProvider', function (p) {
        p.config.events = config.events;
        p.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);

})();
