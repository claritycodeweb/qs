'use strict';

var EventEmitter = require('events');
var util = require('util');

function HttpMock() {
    EventEmitter.call(this);
    this.messageError = "error in httpmock";
    this.messageSuccess = "success in httpmock";
}

util.inherits(HttpMock, EventEmitter)

HttpMock.prototype.get = function (url, callBack) {
    var res = {
        url: url,
        statusCode: 200,
        statusMessage: this.messageSuccess
    }

    setTimeout(function () {
        callBack(res)
    }, 500);
    
    return this;
}

HttpMock.prototype.end = function () {
    console.log("end http get");
}

module.exports = HttpMock