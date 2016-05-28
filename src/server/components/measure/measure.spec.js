'use strict';
var app = require('../..');
var HttpMock = require('../../test/mocks/http.js');
var model = require('../../model/statistic.data');

describe('response time', function () {
    var clock;
    var httpFake = new HttpMock();
    var mytest = require('./index')(httpFake);
    var url = 'http://localhost/angjs';
    
    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it("statistinc number in db", function () {
        mytest.responseTime(url, 1000)
        clock.tick(4500);

        model.find().count(function (err, count) {
            expect(count).to.equal(4);
        });
    });

});
