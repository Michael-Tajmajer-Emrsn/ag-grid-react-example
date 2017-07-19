// Karma configuration
const path = require('path');
const webpack = require("webpack");

module.exports = function(config) {
  config.set({
    webpack: {
      devtool: 'source-map',
      //devtool: "inline-source-map",
      stats: 'normal',
      plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts(x?)|js(x?))($|\?)/i
        }),
        new webpack.DefinePlugin({
          'process.env': {
            'ENV': '"development"',
            'NODE_ENV': '"development"'
          }
        })
      ],
      module: {
        loaders: [
          {
              test: /\.css$/,
              loader: "style!css"
          },
          {
              test: /\.js$|\.jsx$/,
              include: path.join(__dirname, 'src'),
              exclude: path.join(__dirname, 'node_modules'),
              loader: 'babel-loader',
              query: {
                  presets: ['react', 'es2015', 'stage-0']
              }
          },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file?name=[path]/[name].[ext]'
          },
          {
            test: /\.json$/,
            loader: "json-loader"
          }
        ]
      },
      resolve: {
          alias: {
              "ag-grid-root" : __dirname + "/node_modules/ag-grid"
          },
          extensions: ['', '.js', '.jsx', '.json'],
          modules: ['node_modules']
      },
      externals: {
        // for Enzyme
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
    },

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.js',
      'src/**/*.spec.jsx'
    ],

     preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap'],
      'src/**/*.spec.jsx': ['webpack', 'sourcemap']
    },

    webpackMiddleware: {
        noInfo: true,
        quiet: false,
        stats: {
            stats: 'normal',
            colors: true
        }
    },


    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeDebugging'],
    customLaunchers: {
        ChromeDebugging: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
        }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
