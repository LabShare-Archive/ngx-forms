'use strict';

const webpack = require('webpack');

module.exports = function (config) {

    let configuration = {
        basePath: '../',
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            // TODO: remove jquery reference after header directives are migrated
            'node_modules/jquery/dist/jquery.js',
            './test/test-index.ts'
        ],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'test/coverage'
        },
        preprocessors: {
            './test/test-index.ts': ['webpack', 'coverage']
        },
        webpackMiddleware: {
            stats: 'errors-only'
        },
        exclude: [],
        port: 8080,
        browsers: ['Chrome'],
        singleRun: true,
        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },
        // Workaround for test timeout issue: https://github.com/jasmine/jasmine/issues/1327#issuecomment-332939551
        browserNoActivityTimeout: 50000,
        mime: {  // Chrome version 55+ has a bug with TS. See: https://stackoverflow.com/a/41054760
            'text/x-typescript': ['ts', 'tsx']
        },
        colors: true,
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,
        webpack: {
            resolve: {
                // Add '.ts' and '.tsx' as a resolvable extension.
                extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss", ".html"]
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: ['ts-loader']
                    },
                    {
                        test: /\.html$/,
                        use: ['html-loader']
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.scss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader']
                    },
                    {
                        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/,
                        loader: 'url-loader?limit=10000'  // inline static files less than 10KB as DataUrls
                    }
                ]
            },
            plugins: [
                // Used by the /about page
                new webpack.DefinePlugin({
                    PROJECT_BUILD_VERSION: JSON.stringify('test-build-version')
                })
            ],
            cache: true,
            devtool: 'inline-source-map'
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome'];
    }

    config.set(configuration);
};