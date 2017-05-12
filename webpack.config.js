const webpack = require('webpack');
const notifier = require('node-notifier');

// 環境
const ENV_MODE = process.env.NODE_ENV;
// 判斷是否為 Debug 環境
const DEBUG_ON = ENV_MODE !== "production";

const FILE_NAME = DEBUG_ON ? './js/bundle.js' : './build/js/bundle.js';

const ENTRY = DEBUG_ON ? [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:9000',
  'webpack/hot/only-dev-server',
  './js/index.js',
] : [
  './js/index.js',
];

module.exports = {
  entry: ENTRY,
  output: {
    filename: FILE_NAME,
    publicPath: "/"
  },
  devServer: {
    contentBase: './build',
    compress: true,
    port: 9000,
    hot: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {"modules": false}], 'react'],
            plugins: ['transform-object-rest-spread', "transform-class-properties", "react-hot-loader/babel"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Notify(),
  ]
};

// 通知完成 Webpack
function Notify(options){}
Notify.prototype.apply = function(compiler) {
  compiler.plugin("done", function(params) {
    notifier.notify('Webpack Pack Done, Hot Reload Done!');
  });
};