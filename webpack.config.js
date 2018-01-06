'use strict';

require('dotenv').config();
const env = process.env.APP_ENV || 'prod';
const isDev = env !== 'prod';

const webpack = require('webpack');

module.exports = {
    context: __dirname + '/assets/js',
    entry: {
        index: './index',
        contact: './contact'
    },
    output: {
        path: __dirname + '/public/assets/js/',
        filename: './[name].js?v=[hash]'
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
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
    ]
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