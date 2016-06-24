var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

console.log('dev');

module.exports = webpackMerge(commonConfig, {});

