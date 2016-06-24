var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './app/main.ts',
        vendors: './config/vendors.ts',
        polyfills: './config/polyfills.ts'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendors', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html'
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js', '.css']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        /*hot: true,*/
        inline: true,
        progress: true
    }
};