/**
 webpack for gulp-webpack
 created by PLDaily
*/

var webpack = require('webpack');
module.exports = {
    entry: './src/main.js',

    output: {
        filename: 'app.js',
        publicPath: ''
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'},
            { test: /\.vue$/, exclude: /node_modules/, loader: 'vue'},
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        //在gulp下压缩
        /*new webpack.optimize.UglifyJsPlugin({minimize: true}),*/
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify("production") 
            }
        })
    ]
}