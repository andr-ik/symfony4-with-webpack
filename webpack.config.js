'use strict';

require('dotenv').config();
const env = process.env.APP_ENV || 'prod';
const isDev = env !== 'prod';

const webpack = require('webpack');
const yaml = require('js-yaml');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/assets',
    entry: {
        common: './js/common.js',
        index: './js/index.js',
        contact: './js/contact.js'
    },
    output: {
        path: __dirname + '/public/assets/',
        publicPath: '/assets/',
        filename: 'js/[name].js?v=[hash]',
        //library: '[name]'
    },
    watch: isDev,
    devtool: isDev ? 'source-map' : false,
    module: {
        loaders: [{
            test: /\.css/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDev
                    }
                }],
            })
        }, {
            test: /\.scss/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDev
                    }
                }, {
                    loader: 'autoprefixer-loader',
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: isDev
                    }
                }],
            })
        }, {
            test: /\.js/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }]
        }, {
            test: /\.(png|jpg|jpeg|svg)/,
            loader: 'file-loader?name=images/[hash].[ext]'
        }, {
            test: /\.(ttf|eot|woff|woff2)/,
            loader: 'file-loader?name=fonts/[hash].[ext]'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: "css/[name].css?v=[hash]",
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new AssetsPlugin({
            filename: 'assets.yaml',
            path: __dirname + '/config/',
            processOutput: (assets) => {
                return yaml.dump({
                    parameters: {
                        assets: assets
                    }
                });
            }
        }),
    ],
    devServer: {
        contentBase: __dirname + '/public/',
        compress: true,
        port: 9000,
        hot: true,
        inline: true,
        proxy: {
            "*": "http://192.168.99.100:80"
        }
    }
};

if (!isDev) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                unsafe: true
            }
        })
    )
}