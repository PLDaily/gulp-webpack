### Webpack3搭建Vue生产环境

- 老代码使用gulp跟webpack1搭建的环境在old分支上
- 涉及代码规范的配置详见[这里](https://github.com/PLDaily/ESLint-webapck)
- gulp与webpack的区别

早期前端在写代码使用了sass写css，coffee写js需要手动用对应工具去编译各自的文件，Gulp 的定位是 *Task Runner*, 就是用来跑一个一个任务的。将以上的任务放置在gulp中，用一句gulp build便可自动发布。但是gulp没有解决各个模块之间的依赖问题，于是前端就出现了require.js、sea.js用来解决文件之间的依赖。后来有出现了webpack，Webpack 是 module bundler，以 entry 为入口，require不同的文件，调用不同的loader，然后打包生成（js、css、png文件），模块之间的依赖在打包的时候已经处理好了，其plugins选项可实现uglify、hash等功能，即也能实现一些gulp的功能。目前我所接触到的项目暂时还没有webpack解决不了的，故不引入gulp。[参考一](https://segmentfault.com/q/1010000008058766)[参考二](https://www.zhihu.com/question/45536395)

持续更新。。。

1. Hash chunkhash
2. 多个入口
3. 导入外部css
4. AMD COMMONJS require与import
5. css单独打包
6. webpack-dev-server
7. html-webpack-plugin
8. devtool
9. 图片目录的放置
10. PublicPath
11. 不同环境区别