const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 配置 source-map
  devtool: 'inline-source-map',
  // webpack-dev-server 配置
  /* devServer: {
    contentBase: './dist',
    // HMR 配置
    hot: true
  }, */
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
    // HMR 配置
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 输出
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // webpack-dev-middleware 配置
    publicPath: '/'
  }
};
