/* devDependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

/* Plugin instances */
const lessExtractPlugin = new MiniCssExtractPlugin({
  name: 'less/[name].css',
  chunkFilename: '[id].css'
})

const scssExtractPlugin = new MiniCssExtractPlugin({
  name: 'scss/[name].css',
  chunkFilename: '[id].css'
})

const conf  = require('./config.js')

/* Local configuration */
const config        = conf,
      NODE_ENV      = process.env.NODE_ENV,
      devMode       = NODE_ENV === 'development',
      outputPath    = config.outputPath,
      mode          = devMode ? 'development' : 'production',
      entry         = config.entryPoints,
      resolve       = {
                      alias: config.aliases.alias
                    },
      devtool       = devMode ? 'inline-source-map' : 'source-map',
      output        = {
                      filename: '[name].bundle.js',
                      path: outputPath
                    },
      optimization  =  {
                        // splitChunks: {
                        //   cacheGroups: {
                        //     libs: {
                        //       test: /[\\/]node_modules[\\/]/,
                        //       name: 'libs',
                        //       chunks: 'all',
                        //       filename: '[name].min.js'
                        //     }
                        //   }
                        // }
                      },
      plugins       = [
                        new CleanWebpackPlugin({
                          verbose: true
                        }),
                        lessExtractPlugin,
                        scssExtractPlugin
                      ],
      rules         = [
                        {
                          test: [/.js$/],
                          exclude: /(node_modules)/,
                          use: [
                            {
                              loader: 'babel-loader'
                            }
                          ]
                        },
                        {
                          test: /\.css/,
                          use: [
                            { loader: MiniCssExtractPlugin.loader },
                            { loader: 'css-loader' },
                          ]
                        },
                        {
                          test: /\.scss/,
                          use: [
                            { loader: MiniCssExtractPlugin.loader },
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' },
                          ]
                        },
                        {
                          test: /\.less/,
                          use: [
                            { loader: MiniCssExtractPlugin.loader },
                            { loader: 'css-loader' },
                            { loader: 'less-loader' },
                          ]
                        },
                        {
                          test: /\.(woff|woff2|ttf|otf|eot)$/,
                          use: [
                            {
                              loader: "file-loader",
                              options: {
                                outputPath: 'fonts'
                              }
                            }
                          ]
                        },
                        {
                          test: /\.(png|jpg|gif|svg)$/,
                          use: [
                            {
                              loader: 'file-loader',
                              options: {
                                name: '[name].[ext]',
                                outputPath: 'images'
                              }
                            }
                          ]
                        }
                      ];

module.exports = {
  mode: mode,
  entry: entry,
  resolve: resolve,
  devtool: devtool,
  output: output,
  optimization: optimization,
  plugins: plugins,
  module: {
    rules: rules
  }
}