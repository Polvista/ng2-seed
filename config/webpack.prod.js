var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var WebpackMd5Hash = require('webpack-md5-hash');

module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        new WebpackMd5Hash()
    ]

});

