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
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                exclude: [/app.scss$/],
                loaders: ['to-string-loader', 'css', 'sass']
            },
            {
                test   : /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)/,
                loader : 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
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
    }
};