'use strict';

var CounterGroup = require('../model/counterGroup.model');
var StatData = require('../model/statistic.model');
var Board = require('../model/board.model');
var Counter = require('../model/counter.model');

StatData.find({}).remove().exec();

CounterGroup.find({}).remove()
  .then(() => {
    CounterGroup.create(
      {
        _id: 1,
        name: 'response_time',
        defaultUnit: 'ms',
        enable: true,
      },
      {
        _id: 2,
        name: 'system_load',
        defaultUnit: 'MB',
        enable: true
      },
      {
        _id: 3,
        name: 'disk_space',
        defaultUnit: 'GB',
        enable: true
      });
  });

Board.find({}).remove().then(() => {
  Counter.find({}).remove().then(() => {
    var board1 = new Board({ _id: 1, name: 'qs1', enable: true });
    var board2 = new Board({ _id: 2, name: 'qs2', enable: false });

    board1.save(function (err) {
      var stat1 = new Counter({
        name: "Response 1",
        url: "http://localhost/angjs/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat1.save();

      var stat2 = new Counter({
        name: "Response 2 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat2.save();

      var stat3 = new Counter({
        name: "Response 3 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat3.save();

      var stat4 = new Counter({
        name: "Response 4 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat4.save();

      var stat5 = new Counter({
        name: "Response 5 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat5.save();

      var stat6 = new Counter({
        name: "Response 6 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat6.save();

      var stat7 = new Counter({
        name: "Response 7 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat7.save();

      var stat8 = new Counter({
        name: "Response 8 test long text",
        url: "http://localhost/angtest/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat8.save();

      board1.counters = [
        stat1, stat2, stat3, stat4, /*stat5, stat6, stat7, stat8*/
      ];

      board1.save();
    }).then(() => {
      /*
      Board
        .findOne({ name: 'qs1' })
        .populate({path: 'counters', populate: { path: '_counterGroup', model: CounterGroup, select: 'name' }})
        //.populate({ path: 'counters._qs', model: QualityStation })
        //.populate({ path: 'counters._counterGroup', model: CounterGroup })
        .exec(function (err, qs) {
          console.log('The creator is %s', JSON.stringify(qs, null, 4));
          // prints "The creator is Aaron"
        }); */
    });

    board2.save(function (err) {
      var stat1 = new Counter({
        name: "response1",
        url: "http://localhost/rp1/",
        _board: board2._id,
        _counterGroup: 1
      });

      stat1.save();

      board2.counters = [
        stat1
      ];

      board2.save();
    });
  })
});

/*
Board.find().count(function (err, count) {
           console.log(count);
       });
*/