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

    // Start collect statistics      
    container.measure.responseTime('http://localhost/angjs/', 10000);

    function runApp() {
        app.qs = server.listen(container.config.port, container.config.ip, function () {
            console.log('Server listening on %d, in %s mode', container.config.port, app.get('env'));
        });
    }

    // Run app
    runApp();

    return app;
};