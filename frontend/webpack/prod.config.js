const webpack = require('webpack');
const merge = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { discardComments: { removeAll: true }}})
    ]
  },
});
