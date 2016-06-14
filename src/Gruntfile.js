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
        injector: {
            options: {},
            // Inject application script files into index.html (doesn't include bower)
            scripts: {
                options: {
                    transform: function (filePath) {
                        var yoClient = grunt.config.get('yeoman.client');
                        filePath = filePath.replace('/' + yoClient + '/', '');
                        return '<script src="' + filePath + '"></script>';
                    },
                    sort: function (a, b) {
                        var module = /\.module\.(js)$/;
                        var aMod = module.test(a);
                        var bMod = module.test(b);
                        // inject *.module.js first
                        return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
                    },
                    starttag: '<!-- injector:js -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        [
                            '<%= yeoman.client %>/{app,components}/**/!(*.spec|*.mock).js',
                            '!{.tmp,<%= yeoman.client %>}/app/app.js'
                        ]
                    ]
                }
            },

            // Inject component css into index.html
            css: {
                options: {
                    transform: function (filePath) {
                        var yoClient = grunt.config.get('yeoman.client');
                        filePath = filePath.replace('/' + yoClient + '/', '');
                        return '<link rel="stylesheet" href="' + filePath + '">';
                    },
                    starttag: '<!-- injector:css -->',
                    endtag: '<!-- endinjector -->'
                },
                files: {
                    '<%= yeoman.client %>/index.html': [
                        '<%= yeoman.client %>/{app,components}/**/*.css'
                    ]
                }
            } 
        }
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
        'wiredep:client',
        'injector']);
};
