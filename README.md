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

使用extract-text-webpack-plugin插件对css进行单独打包，可通过@import引入外部css资源，不单独打包css加载时可能造成页面出错。

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

require/exports 出生在野生规范当中，什么叫做野生规范？即这些规范是 JavaScript 社区中的开发者自己草拟的规则，得到了大家的承认或者广泛的应用。比如 CommonJS、AMD、CMD 等等。import/export 则是名门正派。TC39 制定的新的 ECMAScript 版本，即 ES6（ES2015）中包含进来。[：https://www.zhihu.com/question/56820346/answer/150724784](：https://www.zhihu.com/question/56820346/answer/150724784)

持续更新。。。

1. Hash chunkhash
2. 多个入口
3. PublicPath
4. 不同环境区别