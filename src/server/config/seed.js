'use strict';

var CounterGroup = require('../model/counterGroup.model');
var StatData = require('../model/statistic.model');
var Board = require('../model/board.model');
var Counter = require('../model/counter.model');
var Chart = require('../model/chart.model');
var Seq = require('../model/seq.model')

module.exports = new Promise(function (resolve, reject) {
    StatData.find({}).remove()
        .then(() => {
            return Chart.find({}).remove();
        })
        .then(() => {
            return Seq.find({}).remove();
        })
        .then(() => {
            return Seq.create({ _id: 'board', seq: 2 });
        })
        .then(() => {
            return CounterGroup.find({}).remove();
        })
        .then(() => {
            return Board.find({}).remove();
        })
        .then(() => {
            return Counter.find({}).remove();
        })
        .then(() => {
            return counterCreate();
        })
        .then(() => {
            return board1Create();
        })
        .then(() => {
            return board2Create();
        })
        .then(() => {
            resolve(); // finish
        })
        .catch(err => {
            if (err) {
                reject(err); //erro
            }
        });
});

function board1Create() {
    var board1 = new Board({ _id: 1, name: 'qs1', urlName: 'qs1', enable: true });

    return board1.save().then(() => {
        return Chart.create(
            {
                _id: 1,
                name: 'Response Time Chart1',
                description: 'Response Time Chart1 Desc',
                total: 0,
                color: '#d62728',
                chartType: 'number'
            },
            {
                _id: 2,
                name: 'CPU',
                description: 'CPU desc',
                total: 100,
                color: '#d62728',
                chartType: 'pie'
            },
            {
                _id: 3,
                name: 'RAM',
                description: 'RAM desc',
                total: 16,
                color: '#1f77b4',
                chartType: 'pie'
            },
            {
                _id: 4,
                name: 'Disc',
                description: 'Disc desc',
                chartType: 'pie',
                total: 250,
                color: '#1f77b4',
            },
            {
                _id: 5,
                name: 'Response Time',
                description: 'Response Time Chart1 Desc',
                chartType: 'number',
                total: 0,
                color: '#d62728',
            },
            {
                _id: 6,
                name: 'Response Time',
                description: 'Response Time Chart1 Desc',
                chartType: 'number',
                total: 0,
                color: '#d62728',
            }).then((ch1, ch2, ch3, ch4, ch5, ch6) => {
                return Counter.create(
                    {
                        name: "Response of http://localhost/angjs/",
                        url: "http://localhost/angjs/",
                        _board: board1._id,
                        _counterGroup: 1,
                        _chart: ch1._id
                    }, {
                        name: "Prod CPU usage",
                        _board: board1._id,
                        _counterGroup: 11,
                        _chart: ch2._id
                    },
                    {
                        name: "Prod Memory usage",
                        shortName: "CPU",
                        _board: board1._id,
                        _counterGroup: 10,
                        _chart: ch3._id
                    },
                    {
                        name: "Prod Disc usage",
                        _board: board1._id,
                        _counterGroup: 12,
                        _chart: ch4._id
                    },
                    {
                        name: "Response of http://localhost/abc/",
                        url: "http://localhost/abc/",
                        _board: board1._id,
                        _counterGroup: 1,
                        _chart: ch5._id
                    },
                    {
                        name: "Response of http://localhost/abc/",
                        url: "http://localhost/abc/",
                        _board: board1._id,
                        _counterGroup: 1,
                        _chart: ch6._id
                    }
                ).then((stat1, stat2, stat3, stat4, stat5, stat6) => {
                    board1.counters = [
                        stat1, stat5, stat6, stat2, stat3, stat4,
                    ];

                    return board1.save();
                })
            });
    });
}

function board2Create() {
    var board2 = new Board({ _id: 2, name: 'qs2', urlName: 'qs2', enable: false });

    return board2.save().then(() => {
        return Chart.create(
            {
                _id: 7,
                name: 'Response Time Chart1',
                description: 'Response Time Chart1 Desc',
                chartType: 'number',
                total: 0,
                color: '#d62728',
            },
            {
                _id: 8,
                name: 'CPU',
                description: 'CPU desc',
                chartType: 'pie',
                total: 100,
                color: '#d62728',
            },
            {
                _id: 9,
                name: 'Response Time Chart1',
                description: 'Response Time Chart1 Desc',
                chartType: 'number',
                total: 0,
                color: '#d62728',
            },
            {
                _id: 10,
                name: 'Local time',
                description: 'Clock',
                chartType: 'clock',
                color: '#d62728',
            }).then((ch1, ch2, ch3, ch4) => {
                return Counter.create(
                    {
                        name: "Response of http://localhost/rp1/",
                        url: "http://localhost/rp1/",
                        _board: board2._id,
                        _counterGroup: 1,
                        _chart: ch1._id
                    },
                    {
                        name: "Prod CPU usage",
                        _board: board2._id,
                        _counterGroup: 11,
                        _chart: ch2._id
                    },
                    {
                        name: "Response of http://localhost/angjs/",
                        url: "http://localhost/angjs/",
                        _board: board2._id,
                        _counterGroup: 1,
                        _chart: ch3._id
                    },
                    {
                        name: "Clock",
                        _board: board2._id,
                        _counterGroup: 13,
                        _chart: ch4._id
                    }
                ).then((stat1, stat2, stat3, stat4) => {
                    board2.counters = [
                        stat1, stat2, stat3, stat4
                    ];

                    return board2.save();
                })
            });
    });
}

function counterCreate() {
    return CounterGroup.create(
        {
            _id: 1,
            name: 'response_time',
            defaultUnit: 'ms',
            platform: 'ALL',
            description: 'Measure response time of specified URL',
            enable: true,
        },
        {
            _id: 2,
            name: 'system_load',
            defaultUnit: 'MB',
            platform: 'ALL',
            description: '',
            enable: false
        },
        {
            _id: 3,
            name: 'disk_space',
            defaultUnit: 'GB',
            platform: 'ALL',
            description: '',
            enable: false
        },
        {
            _id: 5,
            name: 'cpu_load_avg',
            defaultUnit: '',
            platform: 'HEROKU',
            description: 'Provides averages of CPU load at 1, 5 and 15 minute scales, these averages reflect the number of CPU tasks that are queued up',
            enable: true
        },
        {
            _id: 6,
            name: 'memory_usage',
            defaultUnit: 'MB',
            platform: 'HEROKU',
            description: 'The portion of the dyno’s memory (megabytes) held in RAM',
            enable: true
        },
        {
            _id: 7,
            name: 'memory_cache',
            defaultUnit: 'MB',
            platform: 'HEROKU',
            description: 'The portion of the dyno’s memory (megabytes) used as disk cache.',
            enable: true
        },
        {
            _id: 8,
            name: 'memory_swap',
            defaultUnit: 'MB',
            platform: 'HEROKU',
            description: 'The portion of a dyno’s memory, in megabytes, stored on disk. It’s normal for an app to use a few megabytes of swap per dyno. Higher levels of swap usage though may indicate too much memory usage when compared to the dyno size. This can lead to slow response times and should be avoided',
            enable: true
        },
        {
            _id: 9,
            name: 'memory_total',
            defaultUnit: 'MB',
            platform: 'HEROKU',
            description: 'The total memory (megabytes) being used by the dyno, equal to the sum of resident, cache, and swap memory',
            enable: true
        },
        {
            _id: 10,
            name: 'memory_usage',
            short: 'RAM',
            defaultUnit: 'GB',
            platform: 'ALL',
            description: 'The total memory (gigbytes) being used by  the system',
            enable: true
        },
        {
            _id: 11,
            name: 'cpu_usage',
            short: 'CPU',
            defaultUnit: '%',
            platform: 'ALL',
            description: 'Percentage of CPU utilization.',
            enable: true
        },
        {
            _id: 12,
            name: 'disc_usage',
            short: 'DISC',
            defaultUnit: 'GB',
            platform: 'WIN',
            description: 'The total disc space (gigbytes) being used by the system.',
            enable: true
        },
        {
            _id: 13,
            name: 'clock',
            short: 'CLOCK',
            defaultUnit: 's',
            platform: 'ALL',
            description: 'Actual local time.',
            enable: true
        });
}