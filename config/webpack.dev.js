var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',

    debug: true,

    output: {
        chunkFilename: '[id].chunk.js'
    },

    module: {
        loaders: [
            {
                test: /app\.scss$/,
                loaders: ["style", 'css', 'sass']
            }
        ]
    },

    plugins: [

        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })

    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        /*hot: true,*/
        inline: true,
        progress: true
    }

});

