## webpack 常用命令

**************************************************************************************

* 全局安装 webpack

    `npm install webpack -g`
    
* 安装 webpack 依赖

    `npm install webpack --save-dev`
    
* 查看 webpack 版本信息

    `npm info webpack`
    
* 安装指定版本的 webpack

    `npm install webpack@1.12.x --save-dev`
    
* 安装 Webpack 开发工具

    `npm install webpack-dev-server --save-dev`
    
* 编译 entry.js 并打包到 bundle.js

    `webpack entry.js bundle.js`
    
* 安装 loader

    `npm install css-loader style-loader`
    
* 使用 loader 的方式之一

    `webpack entry.js bundle.js --module-bind "css=style!css"`
    
* 配置好 webpack 后，运行 webpack

    `webpack`
    
* 让编译的输出内容带有进度和颜色

    `webpack --progress --colors`
    
* 启动监听模式

    `webpack --progress --colors --watch`
    
* 打印错误详情

    `webpack --display-error-details`