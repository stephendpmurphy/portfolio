const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './public',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
            {
                test:/\.scss$/,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new miniCssExtractPlugin( {
            filename: 'style/style.[chunkhash].css',
        }),
        new copyPlugin({
            patterns: [
                {
                    from: "**/*",
                    context: path.resolve(__dirname, "src", "assets"),
                    to: "assets"
                }
            ],
        })
    ]
};