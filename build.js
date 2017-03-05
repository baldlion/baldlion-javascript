#!/usr/bin/env node

var argv = require('yargs').argv;
var componentName = argv.component;
var webpack = require('webpack');
var webpackConfig;

if (!componentName) {
  return;
}

webpackConfig = {
  entry: `./${componentName}/${componentName}.js`,
  output: {
    filename: `${componentName}.bundle.js`,
    path: `./${componentName}/dist`
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  devtool: '#source-map',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ]
};

webpack(webpackConfig, function (err, stats) {
  console.log(err, stats);
});