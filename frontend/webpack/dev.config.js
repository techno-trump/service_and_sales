const path = require('path');
const merge = require('webpack-merge');
const { DefinePlugin } = require('webpack');

const baseConfig = require('./base.config');

const devFlagPlugin = new DefinePlugin({
  __DEV__: JSON.stringify(true)
});

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    host: '0.0.0.0',
    disableHostCheck: true,
    watchOptions: { poll: 5000, ignored: /node_modules/ },
    historyApiFallback: {
      disableDotRule: true
    }
  },
  plugins: [devFlagPlugin],
});
