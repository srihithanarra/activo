/**
 * Created by srihitha.narra on 8/4/2017.
 */
var path = require('path');

var DIST_DIR = path.join(__dirname, "dist");
var CLIENT_DIR = path.join(__dirname, "src");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    context: CLIENT_DIR,
    entry:{
        app:['./index.js'],
    },
    output:{
        path: DIST_DIR,
        filename: "bundle.js",
    },
    plugins: [
        HtmlWebpackPluginConfig,
    ],
    devtool: 'inline-source-map',
    resolve:{
        extensions: [".js", ".jsx"]
    },
}