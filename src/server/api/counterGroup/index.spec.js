'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var counterGroupCtrlStub = {
    index: 'CounterGroupCtrl.index',
};

var routerStub = {
    get: sinon.spy()
};

// require the index with our stubbed out modules
var counterGroupIndex = proxyquire('./index.js', {
    'express': {
        Router: function () {
            return routerStub;
        }
    },
    './counterGroup.controller': counterGroupCtrlStub
});

describe('CounterGroup API Router:', function () {

    it('should return an express router instance', function () {
        counterGroupIndex.should.equal(routerStub);
    });

    describe('GET /api/countergroups', function () {

        it('should route to counterGroup.controller.index', function () {
            routerStub.get
                .withArgs('/', 'CounterGroupCtrl.index')
                .should.have.been.calledOnce;
        });
    });    
});