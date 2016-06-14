/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MeasureEvents = require('./measure.events');

// Model events to emit
var events = ['save'];

module.exports.register = function (socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('measure:' + event, socket);

    MeasureEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function(doc) {
    //console.log('emit: ' + JSON.stringify(doc));
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    MeasureEvents.removeListener(event, listener);
  };
}
