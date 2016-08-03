'use strict';

var app = require('../..');
var request = require('supertest');

var newBoard;

describe('Board API:', function () {
    
    describe('GET /api/boards', function () {
        var boards;

        // before each is not needed here. this is the actual test
        beforeEach(function (done) {
            request(app)
                .get('/api/boards')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                      throw new Error(err);
                    }
                    boards = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function () {
            boards.should.be.instanceOf(Array);
        });

    }); 

    describe('POST /api/boards', function () {
        beforeEach(function (done) {
            request(app)
                .post('/api/boards')
                .send({
                    _id: 3,
                    name: "Created Board",
                    enable: true
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                      throw new Error(err);
                    }
                    newBoard = res.body;
                    done();
                });
        });

        it('should respond with the newly created board', function () {
            newBoard.urlName.should.equal('Created-Board');
            newBoard.enable.should.equal(true);
        });

    });

    describe('GET /api/boards/:id', function () {
        var board;

        beforeEach(function (done) {
            request(app)
                .get('/api/boards/' + newBoard.urlName)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    board = res.body;
                    done();
                });
        });

        afterEach(function () {
            board = {};
        });

        it('should respond with the requested board', function () {
            board.name.should.equal('Created Board');
            board.enable.should.equal(true);
        });

    });

    describe('PUT /api/boards/:id', function () {
        var updatedBoard;

        beforeEach(function (done) {
            request(app)
                .put('/api/boards/' + newBoard.urlName)
                .send({
                    name: 'Updated Board',
                    enable: false
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }
                    updatedBoard = res.body;
                    done();
                });
        });

        afterEach(function () {
            updatedBoard = {};
        });

        it('should respond with the updated board', function () {
            updatedBoard.name.should.equal('Updated Board');
            updatedBoard.enable.should.equal(false);
        });

    });

    describe('DELETE /api/boards/:id', function () {

        it('should respond with 204 on successful removal', function (done) {
            request(app)
                .delete('/api/boards/' + newBoard.urlName)
                .expect(204)
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when board does not exist', function (done) {
            request(app)
                .delete('/api/boards/' + newBoard.urlName)
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        throw new Error(err);
                    }
                    done();
                });
        });

    });

});
