'use strict';
var HttpMock = require('../../test/mocks/http.js');

describe('responseTime', function () {
    var httpFake = new HttpMock();
    var stat = require('./index')(httpFake);
    var url = 'http://localhost/fake/';

    beforeEach(function () {

    });

    afterEach(function () {

    });

    it("should record time it took to complete request", function () {
        return stat.responseTime(url).then(function (result) {
            assert(499 <= result.took && result.took < 550, 'request took ' + result.took + 'ms');
        }, function (error) {
            assert.fail(error);
        });
    });
});
