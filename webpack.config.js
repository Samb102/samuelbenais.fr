const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: ['./src/index'],
  output: {path: path.join(__dirname, 'dist'), filename: 'bundle.js'},
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{from: 'src/images', to: 'images'}]),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: 'src/favicon.ico',
      template: path.resolve('./index.html'),
    }),
  ],
  resolve: {extensions: ['.js', '.jsx']},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {test: /\.(ico|svg|ttf)$/, use: [{loader: 'file-loader'}]}, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}}
        ]
      }
    ]
  }
};
