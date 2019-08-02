# 扩展构建工具

## node版本要求
10.9.0

## 构建流程
1. 清理`dist`目录
2. 复制国际化及图标文件到`dist`
3. 读取`browser/base/manifest.json`，`browser/${process.env.BROWSER}/mafest.json`合并后生成扩展manifest临时文件
4. 执行`browser/base/.pointrc.js`，`browser/${process.env.BROWSER}/.pointrc.js`结果合并后生成此次打包过程中需要webpack额外进行编译的entry
5. 根据manifest临时文件和`.pointrc.js`的结果生成webpack entry
6. 执行`browser/base/.postcssfunctionrc.js`，`browser/${process.env.BROWSER}/.postcssfunctionrc.js`结果合并后生成额外的postcss-function(用法[参考](https://www.npmjs.com/package/postcss-functions))
7. 执行webpack打包
8. 根据webpack打包结果，替换manifest临时文件中的路径生成正式的manifest.json

## 预定义的webpack env
* process.env.BROWSER(当运行`make-extension dev chrome`时，process.env.BROWSER === 'chrome')

## 预定义的webpack alias
* @(相当于browser/base/src)
* ~(相当于browser/${process.env.BROWSER}/src)

## webpack entry收集原理
1. 生成`manifest.json`，收集文件中以`@/`或`~/`开始的路径，比如`@/pages/newtab.html`
2. 读取`browser/base/.pointrc.js`，`browser/${process.env.BROWSER}/.pointrc.js`记录的路径
3. 将路径转化为entry，比如`@/pages/newtab.html`->`browser/base/src/pages/newtab/index.js`，如果目录下还存在`index.html`就作为该页面对应的html模板传递给`HtmlWebpackPlugin`

## 可以使用的js草案语法
* [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)

## 使用到的postcss plugin
* [postcss-calc](https://github.com/postcss/postcss-calc)
* [postcss-functions](https://github.com/andyjansson/postcss-functions)
* [postcss-import](https://github.com/postcss/postcss-import)
* [postcss-mixins](https://github.com/postcss/postcss-mixins)
* [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars)
* [postcss-utilities](https://github.com/ismamz/postcss-utilities)

## 注意
* 0.5.0之前添加了babel插件`plugin-proposal-decorators`，考虑到会增加代码体积已在0.5.0移除

## 使用中的项目
* http://git.infinitynewtab.com/Starlab/infinity-pro
* http://git.infinitynewtab.com/Starlab/world-infinity-pro
