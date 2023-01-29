


const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const RevPlugin = require('webpack-manifest-rev-plugin');

module.exports = {
  entry: {
    css: './assets/sass/**/*.scss'
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].[contenthash].css'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new ManifestPlugin(),
    new RevPlugin({
      fileNameManifest: 'manifest.json',
      output: path.resolve(__dirname, 'public/assets')
    })
  ]
};




