'use strict';

module.exports = function (grunt) {

    //load task automatically when needed  
    require('jit-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'client',
            server: 'server'
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'mocha.conf.js',
                timeout: 5000 // set default mocha spec timeout
            },
            unit: {
                src: ['<%= yeoman.server %>/**/*.spec.js']
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        // Inject Bower components into the app
        wiredep: {
            options: {
                exclude: [
                ],
            },
            client: {
                src: '<%= yeoman.client %>/index.html',
                ignorePath: '<%= yeoman.client %>/',
            }
        },
    });

    grunt.registerTask('test', function (target, option) {
        if (target === 'server') {
            return grunt.task.run([
                'env:test',
                'mochaTest:unit'
            ]);
        }
        else grunt.task.run([
            'test:server'
        ]);
    });

    grunt.registerTask('build', [
        'wiredep:client']);
};
