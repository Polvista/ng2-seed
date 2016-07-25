var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var CleanWebpackPlugin = require('clean-webpack-plugin');

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

        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint'
            }
        ],

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
        }),

        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..'),
            verbose: true
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js', '.css']
    },

    postcss: function () {
        return [autoprefixer(), rucksack()];
    }
};