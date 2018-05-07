const path = require('path'),
    webpack = require('webpack'),
    excludeNodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'ngx-forms.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ngxForms',
        libraryTarget: 'umd'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        symlinks: true
    },
    externals: [
        // Let NPM manage the third party dependencies
        excludeNodeExternals()
    ],
    module: {
        rules: [
            // all files with a '.ts' extension will be handled by '@ngtools/webpack'
            {
                test: /\.ts$/,
                use: {
                    loader: '@ngtools/webpack',
                    options: {
                        tsConfigPath: path.join(__dirname, 'tsconfig.json')
                    }
                }
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
                loader: 'url-loader'  // inline static files as DataUrls
            }
        ]
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        )
    ],
    bail: true,
    cache: true
};