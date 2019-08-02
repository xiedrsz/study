# webpack 笔录

---

## 安装

最新的webpack版本是：

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

### 全局安装
```bash
npm install webpack -g
```
<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
不推荐全局安装 webpack。这会将你项目webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
</div>

### 本地安装（推荐）
```bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```
如果你使用 webpack 4+ 版本，你还需要安装 CLI。
```bash
npm install --save-dev webpack-cli
```
<div style="background-color:#DCF2FD;color:#618ca0;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
当你在本地安装 webpack 后，你能够从<code>./node_modules/.bin/webpack</code>访问它的 bin 版本。
</div>

## 起步

1. 新建 src/index.js
   ```js
    import _ from 'lodash'
    function component () {
      var element = document.createElement('div');
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
      return element;
    }
    
    document.body.appendChild(component());
   ```

2. 新建 dist/index.html
   ```html
   <!doctype html>
   <html>
   <head>
     <title>起步</title>
     <!-- <script src="https://unpkg.com/lodash@4.16.6"></script> -->
   </head>
   <body>
     <!-- <script src="./src/index.js"></script> -->
     <script src="main.js"></script>
   </body>
   </html>
   ```

3. 修改 package.json
   ``` diff
   {
     "name": "webpack_study",
     "version": "1.0.0",
     "description": "学习webpack",
   + "private": true,
   - "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "webpack": "^4.37.0",
       "webpack-cli": "^3.3.6"
     }
   }
   ```

4. 安装依赖
   ```bash
   npm install --save lodash
   ```

5. 打包
   ```bash
   npx webpack
   ```

6. 使用配置文件
   在根目录新建配置文件 webpack.config.js
   ```js
   const path = require('path');
   
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'main.js',
       path: path.resolve(__dirname, 'dist')
     }
   };
   ```

7. 使用配置文件打包
   ```bash
   npx webpack --config webpack.config.js
   ```

8. 配置 npm 命令
   修改 package.json
   ```diff
   {
     "name": "webpack_study",
     "version": "1.0.0",
     "description": "学习webpack",
     "private": true,
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
   +   "build": "webpack"
     },
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "webpack": "^4.37.0",
       "webpack-cli": "^3.3.6"
     },
     "dependencies": {
       "lodash": "^4.17.15"
     }
   }
   ```

9. 使用 npm 命令打包
   ```bash
   npm run build
   ```

## 管理资源

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件。

## 管理输出

到目前为止，我们在 index.html 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始对文件名使用哈希(hash)]并输出多个 bundle，手动地对 index.html 文件进行管理，一切就会变得困难起来。然而，可以通过一些插件，会使这个过程更容易操控。

常用插件如下：
* html-webpack-plugin:  html
* clean-webpack-plugin:  清理
* webpack-manifest-plugin:  Manifest

如：
``` diff
// webpack.config.js
const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin');
+const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  plugins: [
+   new CleanWebpackPlugin(['dist']),
+   new HtmlWebpackPlugin({
+     title: 'Output Management'
+   })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## 开发

在我们继续之前，先来看看如何建立一个开发环境，使我们的开发变得更容易一些。

<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
本指南中的工具<b>仅用于开发环境</b>，请不要在生产环境中使用它们！
</div>

* ### 使用 source map

为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。

如：
```diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
+ devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

* ### 选择一个开发工具

每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。
webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

* #### 使用观察模式

你可以指示 webpack "watch" 依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

**package.json**
``` diff
{
  "name": "webpack_study",
  "version": "1.0.0",
  "description": "学习webpack",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
+   "watch": "webpack --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.37.0",
    "webpack-cli": "^3.3.6"
  },
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
```

* #### 使用 webpack-dev-server

`webpack-dev-server` 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

**webpack.config.js**
```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
+ devServer: {
+   contentBase: './dist'
+ },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

**package.json**
``` diff
{
  "name": "webpack_study",
  "version": "1.0.0",
  "description": "学习webpack",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
+   "start": "webpack-dev-server --open"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.37.0",
    "webpack-cli": "^3.3.6",
+   "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
```

* #### 使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。




--- 
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