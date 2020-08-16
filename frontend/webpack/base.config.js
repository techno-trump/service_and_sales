const path = require('path');
const childProcess = require('child_process');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  cache: path.resolve(__dirname, '../cache'),
};

const GIT_DIR = path.resolve(__dirname, '../../.git');

const METADATA = {
  build: childProcess.execSync(`git --git-dir=${GIT_DIR} rev-list HEAD --count`).toString().trim(),
  branch: childProcess.execSync(`git --git-dir=${GIT_DIR} rev-parse --abbrev-ref HEAD`).toString().trim(),
  date: childProcess.execSync(`git --git-dir=${GIT_DIR} log -1 --format=%at origin/master | xargs -I{} date -d @{} +"built at %m-%d-%Y %H:%M:%S"`).toString().trim(),
};

const cacheLoader = (path) => ({
  loader: 'cache-loader',
  options: {
    cacheDirectory: PATHS.cache + path,
  }
});

module.exports = {
  entry: ['@babel/polyfill', path.join(PATHS.src, 'index.js')],
  output: {
    path: PATHS.dist,
    filename: '[name].[chunkhash].js',
    pathinfo: false,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      hash: true,
    }),
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
    new DefinePlugin({
      __VERSION__: JSON.stringify('0.1.0'),
      __BUILD__: JSON.stringify(METADATA.build),
      __BRANCH__: JSON.stringify(METADATA.branch),
      __DATE__: JSON.stringify(METADATA.date),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [cacheLoader('/js'), 'babel-loader'],
      },
      {
        test: /\.css$/,
        use:  [cacheLoader('/css'), 'style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
