var path = require('path');

module.exports = {
    target: 'node',

    entry: './server/server.ts',

    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'server.js'
    },

    module: {

        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                exclude: [/app\.scss$/],
                loaders: ['to-string-loader', 'css', 'postcss', 'sass']
            },
            {
                test: /\.json$/,
                loader: 'raw-loader'
            }
        ]

    },

    resolve: {
        extensions: ['', '.ts', '.js', '.css', '.json']
    },

    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    }

};