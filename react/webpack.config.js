/**
 webpack for gulp-webpack
 created by PLDaily
*/

var webpack = require('webpack');

module.exports = {
	entry: './public/app.js',

	output: {
		filename: './bundle.js',
		publicPath: ''
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
			{ test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader'}
		]
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