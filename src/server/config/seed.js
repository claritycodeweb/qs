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
        name: "response1",
        url: "http://localhost/angjs/",
        _board: board1._id,
        _counterGroup: 1
      });

      stat1.save();

      var stat2 = new Counter({
        name: "disk space",
        _board: board1._id,
        _counterGroup: 3
      });

      stat2.save();

      board1.counters = [
        stat2, stat1
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