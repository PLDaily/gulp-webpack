const webpack = require('webpack');
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')

const banner = `
${pkg.description}
v${pkg.version} ©${new Date().getFullYear()} ${pkg.author}
${pkg.homepage}
`.trim()

function resolve (dir, filename = '') {
  return path.join(__dirname, dir, filename)
}

const config = {
	entry: './src/main.js',
	output: {
		path: resolve('dist'),
    publicPath: '/',
    filename: 'build[hash:5].js'
	},
  devtool: 'inline-source-map',//方便调试
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    hot: true,
    // host: 'www.dh.com'可使用本地项目中需要配置的host
  },
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            fix: true,//自动修复
            formatter: require('eslint-friendly-formatter')//编译后错误报告格式，可以让eslint的错误信息出现在终端上
           }
        }],
        include: [resolve('src')] //使用ESLint的文件目录
			},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
        include: [resolve('src')]
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'vue-loader',
        include: [resolve('src')],
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({//vue中css单独打包
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',//基于file-loader，多了个根据文件大小将文件转化为base64还是单独的文件
          options: {
            limit: 100,
            name: 'img/[name].[hash:5].[ext]'
          }
        }]
      }
		]
	},
  plugins: [
    new ExtractTextPlugin({//单独打包css
      filename:  'reset[hash:5].css',
      disable: false,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),//热更新，跟devServer{hot: true}联用
    new HtmlWebpackPlugin({ // 根据模板生成html文件，自导倒入打包后带hash的js与css
      template: resolve('src', 'index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin([resolve('dist')]),//清除dist目录下的文件
    new webpack.BannerPlugin(banner),//打包后文件的顶部显示
    new CopyWebpackPlugin([//复制文件
      {
        from: resolve('src', 'static'),
        to: resolve('dist'),
        ignore: ['.*']
      }
    ])
  ]
}
module.exports = config;
