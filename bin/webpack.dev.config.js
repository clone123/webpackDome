/**
 * Created by huanghuanhuan on 2016/12/5 15:43
 */
var path = require('path');
var context = path.resolve(__dirname, '../');
var webpack = require('webpack');
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var AssetsPlugin = require('assets-webpack-plugin')
var hotEntry = 'webpack-hot-middleware/client?http://localhost:3000/&noInfo=true&reload=true';
var distPath = path.resolve(context, './public/dist/');
var srcPath = path.join(context, './client/');
module.exports = {
  entry: {
    'index': [ hotEntry, srcPath + '/main.js' ]
  },
  debug: true,
  output: {
    publicPath: '/public/dist/',
    path: distPath,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      loader: 'babel',
      query: { presets: [ 'es2015' ] },
      exclude: [ /(node_modules|plugins)/ ]
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.(png|jpg|gif)\??.*$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: 'images/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    } ]
  },
  postcss: function () {
    return {
      plugins: [ precss, autoprefixer ]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new AssetsPlugin()
  ]
}