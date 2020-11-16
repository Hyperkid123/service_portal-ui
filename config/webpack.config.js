const { merge } = require('webpack-merge');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const plugins = require('./webpack.plugins.js');
const common = require('./webpack.common.js');

const commonConfig = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: path.resolve(__dirname, '../node_modules/react')
    }
  },
  entry: {
    App: common.paths.entry
  },
  output: {
    filename: 'catalog.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /src\/.*\.(js)$/,
        exclude: /node_modules/,
        use: [{ loader: 'source-map-loader' }, { loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        sideEffects: true
      },
      {
        test: /\.(woff(2)?|ttf|jpg|png|eot|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins
};

const devConfig = {
  devServer: {
    port: 8003,
    https: true,
    historyApiFallback: true,
    hot: false,
    inline: false,
    disableHostCheck: true,
    publicPath: '/apps/catalog/js'
  }
};

module.exports = function(env) {
  const common = commonConfig;
  if (env.analyze === 'true') {
    common.plugins.push(new BundleAnalyzerPlugin());
  }

  if (env.prod === 'true') {
    return common;
  }

  return merge(common, devConfig);
};
