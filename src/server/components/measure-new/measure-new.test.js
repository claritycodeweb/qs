var httpMock = {
  get: function(request, callback) {
    setTimeout(function() {
      callback({});
    }, 500);

    return {
      on: function() {}
    }
  }
}

var requester = require('./index.js')(httpMock);
var assert = require('assert');

describe('Measure', function() {
  it('should measure time it took to perform request', function() {
    return requester.get('fakeUrl').then(function(res) {
      assert(500 < res.took && res.took < 550);
    })
  });
});
