'use strict';
var HttpMock = require('../../test/mocks/http.js');

describe('Collect Statistics:', function () {
    var httpFake = new HttpMock();
    var stat = require('./index')(httpFake);
    var fakeUrl = 'http://localhost/fake/';
    
    describe('Response Time', function () {
        beforeEach(function () {

        });

        afterEach(function () {

        });

        it("should record time it took to complete request", function () {
            return stat.responseTime(fakeUrl).then(function (result) {
                assert(499 <= result.took && result.took < 550, 'request took ' + result.took + 'ms');
            }, function (error) {
                assert.fail(error);
            });
        });
    });
});
