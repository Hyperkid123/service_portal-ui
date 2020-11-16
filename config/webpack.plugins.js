const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const plugins = [
  new ModuleFederationPlugin({
    name: 'catalog',
    remotes: {
      chrome: 'chrome'
    }
  }),
  new HtmlWebpackPlugin({
    title: 'Catalog for ansible',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html')
  }),
  new webpack.SourceMapDevToolPlugin({
    test: /\.js/i,
    exclude: /(node_modules|bower_components)/i,
    filename: `sourcemaps/[name].js.map`
  }),
  new webpack.DefinePlugin({
    'process.env.BASE_PATH': JSON.stringify(process.env.BASE_PATH || '/api')
  }),
  new HtmlReplaceWebpackPlugin([
    {
      pattern: '@@env',
      replacement: config.appDeploy
    }
  ])
];

module.exports = plugins;
