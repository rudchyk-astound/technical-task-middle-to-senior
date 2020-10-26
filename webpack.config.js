const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const products = require('./api/products.json');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 9000,
    before: function(app, server, compiler) {
      app.get('/api/products', function(req, res) {
        res.json(products);
      });
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
  ],
};