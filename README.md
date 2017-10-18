### Webpack3搭建Vue生产环境

> 老代码使用gulp跟webpack1搭建的环境在old分支上

> 涉及代码规范的配置详见[这里](https://github.com/PLDaily/ESLint-webapck)

> gulp与webpack的区别

早期前端在写代码使用了sass写css，coffee写js需要手动用对应工具去编译各自的文件，Gulp 的定位是 *Task Runner*, 就是用来跑一个一个任务的。将以上的任务放置在gulp中，用一句gulp build便可自动发布。但是gulp没有解决各个模块之间的依赖问题，于是前端就出现了require.js、sea.js用来解决文件之间的依赖。后来有出现了webpack，Webpack 是 module bundler，以 entry 为入口，require不同的文件，调用不同的loader，然后打包生成（js、css、png文件），模块之间的依赖在打包的时候已经处理好了，其plugins选项可实现uglify、hash等功能，即也能实现一些gulp的功能。目前我所接触到的项目暂时还没有webpack解决不了的，故不引入gulp。[参考一](https://segmentfault.com/q/1010000008058766)[参考二](https://www.zhihu.com/question/45536395)

> 开发辅助调试工具devtool

devtool主要用于代码的调试，当多个JS代码被打包成一个文件时，如何页面发生错误，浏览器的在打包后的文件上报错误提示，很难定位到错误的位置，devtool设置不同的属性可以准确的定位到错误的位置。[参考](https://doc.webpack-china.org/configuration/devtool/#devtool)

> 插件

- html-webpack-plugin主要用于为html文件中引入的外部资源如`script`、`link`动态添加每次compile后的hash，防止引用缓存的外部文件问题，也可根据模板加入自定义的内容。
- extract-text-webpack-plugin用于将嵌入在页面里的css样式文件单独打包出来。
- clean-webpack-plugin用于清除上一个版本的文件。
- copy-webpack-plugin用于对文件的在不同目录之间的复制。

> 图片的处理

url-loader是对file-loader的上层封装，url-loader可限制一定大小的文件转成base64，而是以单文件的形式直接输出。单独输出的文件目录之间在name中写明。

```
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
```

> css单独打包

使用extract-text-webpack-plugin插件对css进行单独打包，可通过@import引入外部css资源(或require引入外部css资源，区别如下面的require与import的区别所示)，不单独打包css加载时可能造成页面出错。

> webpack-dev-server

webpack-dev-server搭建一个测试的环境，并执行热更新，使用示例如下：

```
devServer: {
	contentBase: resolve('dist'),
	compress: true,
	hot: true
},
plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```

```
"scripts": {
   "start": "webpack-dev-server --open"
}
```

> require与import的区别

require/exports 出生在野生规范当中，什么叫做野生规范？即这些规范是 JavaScript 社区中的开发者自己草拟的规则，得到了大家的承认或者广泛的应用。比如 CommonJS、AMD、CMD 等等。import/export 则是名门正派。TC39 制定的新的 ECMAScript 版本，即 ES6（ES2015）中包含进来。[https://www.zhihu.com/question/56820346/answer/150724784](https://www.zhihu.com/question/56820346/answer/150724784)

> 设置别名

```
import Index from '@/components/Index'
```

项目中通过'@components/Index'导入，可在webpack中设置别名

```
{
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '~': resolve('src/components')
    }
  }
}
```

> 多个入口

- 俩个文件不含公共代码时

```
module.exports={ 
	entry:{
		a:"./src/a/a.js",
		b:"./src/b/b.js"
	}, 
	output:{ 
		path:path.resolve(__dirname ,"dist/js"), 
		filename:"[name].js" 
	}
}
```

- 俩个文件包含公共代码时

```
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path=require("path"); 
module.exports={ 
	entry:{
		a:"./src/a/a.js",
		b:"./src/b/b.js"
	}, 
	output:{ 
		path:path.resolve(__dirname ,"dist/js"), 
		filename:"[name].js" 
	}, 
	plugins:[ new CommonsChunkPlugin({name:"common"}) ]
}
```

> hash与chunkhash

- 使用hash三个js文件任何一个改动都会影响另外两个文件的最终文件名。上线后，另外两个文件的浏览器缓存也全部失效。
- chunkhash只会改变修改的文件的hash

> webpack依赖相同的包是否重复打包

webpack会给每个依赖的模块一个moduleid，当依赖相同的包时只引用相对应的包id，不会重复id。

例: index.js依赖util1.js与util2.js，util1.js依赖util2.js。

```js
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var util1 = __webpack_require__(2)
	var util2 = __webpack_require__(3)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var util2 = __webpack_require__(3)
	module.exports = {"name": "util1.js"}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = {"name": "util2.js"}


/***/ })
```

moduleid1为index.js，moduleid2为util1.js，moduleid3为util2.js，index.js依赖util1.js与util2.js引入module2跟module3，util1.js依赖util2.js则引入module3，util2.js为module3，不会重复打包。

> Babel-runtime与Babel-polyfill的区别

- Babel默认只会转化新的JS语法，对于新的api不会进行转化，例全局对象（Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等）以及一些全局对象上的方法（ Object.assign等）。如果需要使用这些方法和对象，必须使用Babel-polyfill为当前环境提供一个垫片
- Babel-polyfill会使一些帮助函数重复出现在一些模块中，造成编译后的代码体积变大。Promise等可直接在全局中使用
- Babel-runtime提供编译模块复用工具函数，减少代码体积，Babel-runtime/helps 下的工具函数自动引用了 polyfill，避免全局变量污染

持续更新。。。

1. PublicPath
2. 不同环境区别
3. 测试包到npm上，该包包含了lodash，webpack打包时在入口文件entry.js中引入了该测试包和lodash发现打包后的文件lodash被引入了俩次 ，如果是不同版本的lodash如何处理
   - module.exports = {_ : lodash}导出
   - CommonsChunkPlugin
   - [参考](https://cnodejs.org/topic/5867bb575eac96bb04d3e301)
4. 如何在css单独打包，在修改css时不修改js的hash，在修改js时不修改css的hash？

