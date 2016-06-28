// Expose app
exports = module.exports = function (container) {
    // connect to db
    container.mongoose.connect(container.config.mongo.uri, container.config.mongo.options);
    container.mongoose.connection.on('error', function (err) {
        console.error('Mongo connection error: ' + err);
        process.exit(-1);
    });

    // prepare initial data
    if (container.config.seedDB) {
        console.log("SeedDB Active, Clean/Restore DB data.")
        require('./config/seed');
    }

    // Setup server
    var app = container.express(); // create our app w/ express
    var server = container.http.createServer(app);
    require('./config/express')(app);
    require('./routes')(app);

    // Setup socketIo
    var socketIoService = container.socketIoService(container.socketIo(server));
    socketIoService.start().disconnect(function () {
        //container.measure.stop();
    });

    function runApp() {
        app.qs = server.listen(container.config.port, container.config.ip, function () {
            console.log('Server listening on %d, in %s mode', container.config.port, app.get('env'));
            var Board = require('./model/board.model');
            var CounterGroup = require('./model/counterGroup.model');
            var Counter = require('./model/counter.model');
            
            setTimeout(function() {
              Board
                .find({})
                .populate({ path: 'counters', populate: { path: '_counterGroup', model: CounterGroup, select: 'name' } })
                .then(function (board) {
                    //console.log('The creator is %s', JSON.stringify(board, null, 4));
                    board.forEach(function (b) {
                        b.counters.forEach(function (c) {
                            if (typeof c.url !== 'undefined') {
                                console.log(c.url);
                                container.measure.responseTime(c.url, 10000, b, c);
                            }
                        }, this);

                    }, this);

                })              
            }, 500);
            


            // Start collect statistics      

        });
    }

    if (container.config.runMeasure) {
        // Run app
        runApp();
    }

    return app;
};