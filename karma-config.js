/*var es6ify = require('es6ify');
var brfs = require('brfs');*/
var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            'http://code.jquery.com/jquery-1.11.1.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.js',
            'app/vendor/ui-bootstrap-tpls-0.12.1.min.js',
            'app/**/*.js',
            // Angular-mocks moet na app.js geladen worden omdat daar angular in zit
            'node_modules/angular-mocks/angular-mocks.js',
            'test/*.spec.js'
        ],
 
        reporters: ['progress', 'coverage'],

        preprocessors: {
          // source files, that you wanna generate coverage for
          // do not include tests or libraries
          // (these files will be instrumented by Istanbul)
          'app/**/*.js': ['coverage', 'browserify']
        },

        browserify: {
          debug: true,
          transform: [/*es6ify, brfs, 'browserify-shim',*/ istanbul({
            ignore: ['**/node_modules/**', '**/test/**'],
          })],
        },

        // optionally, configure the reporter
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },
 
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
 
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
 
        browsers: ['Chrome']
 
    });
};