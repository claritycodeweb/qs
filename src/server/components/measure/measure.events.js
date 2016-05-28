'use strict';

//imports
var EventEmitter = require('events');
var StatData =  require('../../model/statistic.data');

var MeasureEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MeasureEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  StatData.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    //MeasureEvents.emit(event + ':' + doc._id, doc);
    MeasureEvents.emit(event, doc);
  };
}

module.exports = MeasureEvents;
