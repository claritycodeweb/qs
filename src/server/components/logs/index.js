var _ = require('lodash');
var Board = require('../../model/board.model');
var CounterGroup = require('../../model/counterGroup.model');
var Counters = require('../../model/counter.model');
var Statistics = require('../../model/statistic.model');
var cache = require('../../components/cache');

var boards;

function Logs() {
    boards = cache.get('boards');
}

function getBoards() {
    Board.find({})
        .populate({ path: 'counters', populate: { path: '_counterGroup', model: CounterGroup, select: 'name' } })
        .then(function (entities) {
            boards = entities;
            cache.set('boards', entities);
        });
}

Logs.prototype.parse = function (data) {
    if (!boards) {
        getBoards();
    } else {


        var requestBoards = boards.filter(function (board) {
            return board.id === [];
        });

        _.forEach(data.boards, function (_id) {
            _.forEach(boards, function (board) {
                if (board._id === _id) {
                    _.forEach(board.counters, function (counter) {
                        if (counter._counterGroup.name === data.counterName) {
                            var model = {
                                value: data.value,
                                isError: false,
                                _board: board._id,
                                _counter: counter._id
                            };
                            console.log(model);
                            Statistics.create(model);
                        }
                    });
                }
            });
        });
    }
};

module.exports = Logs;