'use strict';

var cache = {};

module.exports = {
    get: function (key) {
        return cache[key];
    },
    set: function (key, data) {
        cache[key] = data;
    },
    remove: function (key) {
        cache[key] = null;
    },
    removeAll: function () {
        cache = {};
    }
};