'use strict';

var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  context: __dirname + "/src",
  entry: './module.ts',
  output: {
    filename: "module.js",
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "amd"
  },
  externals: [
  // remove the line below if you don't want to use buildin versions
  'jquery', 'lodash', 'moment', function (context, request, callback) {
    var prefix = 'grafana/';
    if (request.indexOf(prefix) === 0) {
      return callback(null, request.substr(prefix.length));
    }
    callback();
  }],
  plugins: [new webpack.optimize.OccurrenceOrderPlugin(), new CopyWebpackPlugin([{ from: 'plugin.json' }])],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loaders: [{
        loader: "babel-loader",
        options: { presets: ['env'] }
      }, "ts-loader"],
      exclude: /node_modules/
    }]
  }
};
