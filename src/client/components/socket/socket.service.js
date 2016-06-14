/* global io */
'use strict';

angular.module('app')
  .factory('socket', ['$rootScope', 'socketFactory', function ($rootScope, socketFactory) {

    var ioSocket = io('', {});
    var socket = socketFactory(ioSocket);

    return {
      socket: socket,
      /**
       * Register listeners to sync an array with updates on a model
       */
      syncUpdates: function (modelName, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          //socket.emit('info', { client: item });
          $rootScope.$broadcast('new-statistics', item);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
      }
    };
  }]);
