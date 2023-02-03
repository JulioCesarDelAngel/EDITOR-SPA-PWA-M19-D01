const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Agregar y configurar complementos del workbox para un service worker y un archivo de manifiesto.
// TODO: Agregar cargadores de CSS y babel al webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
    ],

    module: {
      rules: [
                {
                  test: /\.css$/i,
                  use: ['style-loader', 'css-loader'],
                },
                {
                  test: /\.(png|svg|jpg|jpeg|gif)$/i,
                  type: 'asset/resource',
                },        
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                  }
                }
      ],
    },
  };
};
