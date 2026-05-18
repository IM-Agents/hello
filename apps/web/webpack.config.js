const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const isProd = process.env.NODE_ENV === 'production'
const publicPath = process.env.PUBLIC_PATH || '/'
const apiBaseUrl = isProd
  ? process.env.API_BASE_URL || 'http://localhost:4000'
  : '/api'

module.exports = {
  entry: path.resolve(__dirname, 'src/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[contenthash:8].js',
    clean: true,
    publicPath,
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new webpack.DefinePlugin({
      __API_BASE_URL__: JSON.stringify(apiBaseUrl),
    }),
    ...(isProd ? [new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' })] : []),
  ],
  devServer: {
    port: Number(process.env.WEB_PORT || 3001),
    historyApiFallback: { index: publicPath },
    static: { directory: path.resolve(__dirname, 'public') },
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.API_PORT || 4000}`,
        changeOrigin: true,
      },
    },
  },
  devtool: isProd ? 'source-map' : 'eval-source-map',
}
