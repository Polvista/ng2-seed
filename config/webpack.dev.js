var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge(commonConfig, {

    devtool: 'cheap-module-eval-source-map',

    debug: true,

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        /*hot: true,*/
        inline: true,
        progress: true
    }

});

