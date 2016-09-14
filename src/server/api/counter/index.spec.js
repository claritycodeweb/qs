'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var counterCtrlStub = {
    show: 'counterCtrl.show',
    create: 'counterCtrl.create',
};

var routerStub = {
    get: sinon.spy(),
    post: sinon.spy()
};

// require the index with our stubbed out modules
var counterIndex = proxyquire('./index.js', {
    'express': {
        Router: function () {
            return routerStub;
        }
    },
    './counter.controller': counterCtrlStub
});

describe('Counter API Router:', function () {

    it('should return an express router instance', function () {
        counterIndex.should.equal(routerStub);
    });

    describe('GET /api/counters/:id', function () {

        it('should route to counter.controller.show', function () {
            routerStub.get
                .withArgs('/:id', 'counterCtrl.show')
                .should.have.been.calledOnce;
        });

    });
});