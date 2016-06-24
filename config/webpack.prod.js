var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    htmlLoader: {
        minimize: false // workaround for ng2
    }

});

