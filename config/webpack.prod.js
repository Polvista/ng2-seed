var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

console.log('prod');

module.exports = webpackMerge(commonConfig, {});

