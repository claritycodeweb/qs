'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var boardCtrlStub = {
    index: 'boardCtrl.index',
    show: 'boardCtrl.show',
    create: 'boardCtrl.create',
    update: 'boardCtrl.update',
    destroy: 'boardCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var boardIndex = proxyquire('./index.js', {
    'express': {
        Router: function () {
            return routerStub;
        }
    },
    './board.controller': boardCtrlStub
});

describe('Board API Router:', function () {

    it('should return an express router instance', function () {
        boardIndex.should.equal(routerStub);
    });

    describe('GET /api/boards', function () {

        it('should route to board.controller.index', function () {
            routerStub.get
                .withArgs('/', 'boardCtrl.index')
                .should.have.been.calledOnce;
        });

    });

    describe('GET /api/boards/:id', function () {

        it('should route to board.controller.show', function () {
            routerStub.get
                .withArgs('/:id', 'boardCtrl.show')
                .should.have.been.calledOnce;
        });

    });
    
    describe('POST /api/boards', function () {

        it('should route to board.controller.create', function () {
            routerStub.post
                .withArgs('/', 'boardCtrl.create')
                .should.have.been.calledOnce;
        });

    });

    describe('PUT /api/boards/:id', function () {

        it('should route to board.controller.update', function () {
            routerStub.put
                .withArgs('/:id', 'boardCtrl.update')
                .should.have.been.calledOnce;
        });

    });

    describe('PATCH /api/boards/:id', function () {

        it('should route to board.controller.update', function () {
            routerStub.patch
                .withArgs('/:id', 'boardCtrl.update')
                .should.have.been.calledOnce;
        });

    });

    describe('DELETE /api/boards/:id', function () {

        it('should route to board.controller.destroy', function () {
            routerStub.delete
                .withArgs('/:id', 'boardCtrl.destroy')
                .should.have.been.calledOnce;
        });

    });
});