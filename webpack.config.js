'use strict';

require('dotenv').config();
const env = process.env.APP_ENV || 'prod';
const isDev = env !== 'prod';

const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/assets/js',
    entry: {
        common: './common',
        index: './index',
        contact: './contact'
    },
    output: {
        path: __dirname + '/public/assets/js/',
        publicPath: "/assets/js/",
        filename: '[name].js?v=[contenthash]',
        //library: "[name]"
    },
    watch: isDev,
    devtool: isDev ? 'source-map' : false,
    module: {
        loaders: [{
            test: /\.js/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)/,
            loader: 'file?name=[path][name].[ext]'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        {
            apply: function (compiler) {
                compiler.plugin('done', function (stats) {
                    fs.writeFileSync('./config/version.json', JSON.stringify({
                        version: stats.hash
                    }));
                });
            }
        }
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