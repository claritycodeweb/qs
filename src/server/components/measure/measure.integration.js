//TODO
var app = require('../..');
var HttpMock = require('../../test/mocks/http.js');
var CounterGroup = require('../../model/counterGroup.model');
var StatData = require('../../model/statistic.model');
var Board = require('../../model/board.model');
var Counter = require('../../model/counter.model');

describe('Circle Repsonse Time:', function () {
    describe('responseTime', function () {

        var httpFake = new HttpMock();
        var stat = require('../statistic')(httpFake);
        var measure = require('./index')(httpFake, stat);
        var url = 'http://localhost/fake/';

        beforeEach(function (done) {
            CounterGroup.find({}).remove()
                .then(() => {
                    CounterGroup.create(
                        {
                            _id: 1,
                            name: 'response_time',
                            defaultUnit: 'ms',
                            enable: true,
                        });
                });

            Board.find({}).remove().then(() => {
                Counter.find({}).remove().then(() => {
                    var board1 = new Board({ _id: 1, name: 'qs1', enable: true });

                    board1.save(function (err) {
                        if (err) {
                            done(err);
                        }

                        var stat1 = new Counter({
                            name: "Response 2",
                            url: "http://localhost/fake/",
                            _board: board1._id,
                            _counterGroup: 1
                        });

                        stat1.save();

                        board1.counters = [
                            stat1
                        ];

                        board1.save();

                    }).then(() => {
                        done();
                    });
                })
            });
        });

        afterEach(function (done) {
            StatData.remove({}, function () {
                done();
            });
        });

        it("should record multiple time took to complete multiple request", function (done) {

            Board.find()
                .populate({
                    path: 'counters',
                    populate: {
                        path: '_counterGroup',
                        model: CounterGroup,
                        select: 'name'
                    }
                }).exec(function (err, boards) {
                    if (err) {
                        assert.fail(err);
                    }

                    boards.forEach(function (board) {
                        board.counters.forEach(function (counter) {
                            if (typeof counter.url !== 'undefined') {
                                measure.responseTime(counter.url, 200, board, counter);
                                setTimeout(function() {
                                    measure.stop(function(){
                                        measure.responses().forEach(function(element) {
                                           
                                            assert(499 <= element.took && element.took < 550, 'request took ' + element.took + 'ms');   
                                                     
                                        }, this);
                                        done(); 
                                    })                                   
                                }, 1500);
                                                                                               
                            }
                        }, this);

                    }, this);

                    
                })


        });
    });
});