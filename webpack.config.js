const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin') 
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDebug = process.env.NODE_ENV === 'development';

var webpackConfig = {
    entry:{
      bundle: [
        path.join(__dirname, 'src/index.js')
      ]
    },
    output: {
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    mode: isDebug ? 'development' : 'production',
    resolve: { // 设置模块如何被解析
        extensions:['.css','.scss','.js','.vue'],
        modules: ['node_modules'],
        alias: {
        	'vue$': 'vue/dist/vue.esm.js',
            'components': path.resolve(__dirname, './src/components'),
            'server': path.resolve(__dirname, './src/server'),
            'assets': path.resolve(__dirname, './assets'),
            'utils': path.resolve(__dirname, './src/utils'),
            'store': path.resolve(__dirname, './src/store'),
        }
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.vue$/, // 处理vue模块
          use: 'vue-loader'
        },
        {
          test: /\.js$/, //处理es6语法
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(css|scss)$/,
          // exclude: /node_modules/,
          use: [
            isDebug ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name]-[hash:6].[ext]'
            }
          }]
        }, 
        {
          test: /\.(woff|woff2|eot|svg|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'assets/[name]-[hash:6].[ext]'
            }
          }],
        }, {
          test: /\.(csv|tsv)$/,
          use: [
            'csv-loader',
          ],
        }, {
          test: /\.xml$/,
          use: [
            'xml-loader',
          ],
        }
      ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            title: '铁路',
            template: path.resolve(__dirname, 'src/template.html'),
            filename: 'index.html',
            favicon: 'favicon.ico',
            inject: 'body',
            hash: true,
            cache: true,
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
            }
        })
    ]
  };


if (isDebug) {
  webpackConfig.devtool = 'cheap-module-eval-source-map'
  webpackConfig.entry.bundle = [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server'
  ].concat(webpackConfig.entry.bundle)
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  webpackConfig.output.publicPath = '/resource/h5-active/'
  webpackConfig.plugins.push(new MiniCssExtractPlugin({
    filename: "assets/[name].[chunkhash:8].css",
    chunkFilename: "assets/[id].css"
  }))

  webpackConfig.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      },
      minimizer: [
        new UglifyJsPlugin({ // 压缩js
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: false,
              drop_console: true
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({ // 压缩css
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
  }
}
  
module.exports = webpackConfig