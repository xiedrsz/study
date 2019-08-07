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

## 开发

在我们继续之前，先来看看如何建立一个开发环境，使我们的开发变得更容易一些。

<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
本指南中的工具<b>仅用于开发环境</b>，请不要在生产环境中使用它们！
</div>

### 使用 source map

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

### 选择一个开发工具

每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。
webpack 中有几个不同的选项，可以帮助你在代码发生变化后自动编译代码：
1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

#### 使用观察模式

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

#### 使用 webpack-dev-server

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

#### 使用 webpack-dev-middleware

`webpack-dev-middleware` 是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求。

**webpack.config.js**
``` diff
const path = require('path');
+const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
+ plugins: [
+   new HtmlWebpackPlugin({
+     title: 'Output Management'
+   })
+ ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
+   publicPath: '/'
  }
};
```

**server.js**
``` js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
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
    "start": "webpack-dev-server --open",
+   "server": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
+   "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.37.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
```

## 模块热替换

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
<b>HMR</b> 不适用于生产环境，这意味着它应当只在开发环境使用。
</div>

### 启用 HMR

启用此功能实际上相当简单。而我们要做的，就是更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件。

<div style="background-color:#DCF2FD;color:#618ca0;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
如果你使用了 <code>webpack-dev-middleware</code> 而没有使用 webpack-dev-server，请使用 <code><font color="#2086d7">webpack-hot-middleware</font></code> package 包，以在你的自定义服务或应用程序上启用 HMR。
</div>

######

__webpack.config.js__
``` diff
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
+const webpack = require('webpack');

module.exports = {
  // 入口
  entry: './src/index.js',
  // 配置 source-map
  devtool: 'inline-source-map',
  // webpack-dev-server 配置
  devServer: {
    contentBase: './dist',
+   hot: true
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management'
    }),
+   new webpack.NamedModulesPlugin(),
+   new webpack.HotModuleReplacementPlugin()
  ],
  // 输出
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // webpack-dev-middleware 配置
    publicPath: '/'
  }
};
```
<div style="background-color:#DCF2FD;color:#618ca0;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
你可以通过命令来修改 <font color="#2086d7">webpack-dev-server</font> 的配置：<code>webpack-dev-server --hotOnly</code>
</div>

######

注意，我们还添加了 `NamedModulesPlugin`，以便更容易查看要修补(patch)的依赖。

__index.js__
``` diff
import _ from 'lodash'
import printMe from './print'
function component (...args) {
  var element = document.createElement('div');
  element.innerHTML = _.join(args, ' ');
  return element;
}

document.body.appendChild(component(['Hello', 'webpack', 'server']));

+if (module.hot) {
+ module.hot.accept('./print.js', function () {
+   console.log('Accepting the updated printMe module!');
+   printMe();
+ })
+}
```

### 通过 Node.js API

当使用 webpack dev server 和 Node.js API 时，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。例如：

``` js
new WebpackDevServer(compiler, options)
```

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。webpack-dev-server package 中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个小例子：

__dev-server.js__
``` js
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
  open: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

<div style="background-color:#DCF2FD;color:#618ca0;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
如果你在使用 <font color="#2086d7">webpack-dev-middleware</font>，可以通过 <font color="#2086d7">webpack-hot-middleware</font> package 包，在自定义开发服务下启用 HMR。
</div>

## tree shaking

tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export。这个术语和概念实际上是兴起于 ES2015 模块打包工具 rollup。

新的 webpack 4 正式版本，扩展了这个检测能力，通过 package.json 的 "sideEffects" 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯的 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

__Todo__
试验都默认已开启，无法关闭。[点我](https://www.webpackjs.com/guides/tree-shaking/)查看教程。

## 生产环境构建

### 配置

开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写**彼此独立的 webpack 配置**。

但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 `webpack-merge` 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。

__webpack.common.js__
``` js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

__webpack.dev.js__
``` js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
```

__webpack.prod.js__
``` js
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
```

__package.json__
``` diff
{
  "name": "webpack_study",
  "version": "1.0.0",
  "description": "学习webpack",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
-    "build": "webpack",
+    "build": "webpack --config webpack.prod.js",
    "watch": "webpack --watch",
-    "start": "webpack-dev-server --open",
+    "start": "webpack-dev-server --open --config webpack.dev.js",
    "server": "node server.js",
    "dev": "node dev-server.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.37.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2",
    "webpack-merge": "^4.2.1"
  },
  "dependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "lodash": "^4.17.15",
    "save-dev": "^2.0.0",
    "uglifyjs-webpack-plugin": "^2.2.0"
  }
}
```

## 代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

有三种常用的代码分离方法：
* 入口起点：使用 entry 配置手动地分离代码。
* 防止重复：使用 CommonsChunkPlugin 去重和分离 chunk。
* 动态导入：通过模块的内联函数调用来分离代码。

### 入口起点(entry points)

这是迄今为止最简单、最直观的分离代码的方式。

__webpack.config.js__
```js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### 防止重复(prevent duplication)

`CommonsChunkPlugin` 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件，将之前的示例中重复的 lodash 模块去除：

__webpack.config.js__
``` diff
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
+ optimization: {
+   splitChunks: {
+     chunks: 'all'
+   }
+ }
};
```

以下是由社区提供的，一些对于代码分离很有帮助的插件和 loaders：
* mini-css-extract-plugin: 用于将 CSS 从主应用程序中分离。
* bundle-loader:  用于分离代码和延迟加载生成的 bundle。
* promise-loader: 类似于 bundle-loader ，但是使用的是 promises。

### 动态导入(dynamic imports)

当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure。让我们先尝试使用第一种……

<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
<code>import()</code> 调用会在内部用到 promises。如果在旧有版本浏览器中使用 <code>import()</code>，记得使用 一个 polyfill 库（例如 es6-promise 或 promise-polyfill），来 shim Promise。
</div>

######

__webpack.config.js__
``` js
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

__index.js__
``` js
function getComponent () {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }).catch(error => `An error occurred while loading the component: ${error}`);
}

getComponent().then(component => {
  document.body.appendChild(component);
})
```

### bundle 分析(bundle analysis)

* [官方分析工具](https://github.com/webpack/analyse)
* [webpack-chart](https://alexkuz.github.io/webpack-chart/): webpack 数据交互饼图。
* [webpack-visualizer](https://chrisbateman.github.io/webpack-visualizer/): 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。

## 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

### 示例

__print.js__
``` js
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
}
```

__index.js__
``` js
import _ from 'lodash';

function component () {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;

    print();
  });

  return element;
}

document.body.appendChild(component());
```

## 缓存

### 输出文件的文件名(Output Filenames)

通过使用 `output.filename` 进行文件名替换，可以确保浏览器获取到修改后的文件。

__webpack.config.js__
```js
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

<div style="background-color:#fbedb7;color:#8c8466;font-style:italic;font-size:.8em;border-radius:4px;padding:1em;font-weight:200;">
此方案在代码修改时文件名也会跟着修改，但代码未修改时文件名可能也会被改变，另外输出可能会因当前的 webpack 版本而稍有差异。新版本不一定有和旧版本相同的 hash 问题，但我们以下推荐的步骤，仍然是可靠的。
</div>

### 提取模板(Extracting Boilerplate)

As we learned in code splitting, the SplitChunksPlugin can be used to split modules out into separate bundles. webpack provides an optimization feature to split runtime code into a separate chunk using the `optimization.runtimeChunk` option. Set it to single to create a single runtime bundle for all chunks:

__webpack.config.js__
``` diff
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
+ optimization: {
+   runtimeChunk: 'single'
+ }
};
```

It's also good practice to extract third-party libraries, such as lodash or react, to a separate vendor chunk as they are less likely to change than our local source code. This step will allow clients to request even less from the server to stay up to date. This can be done by using the cacheGroups option of the SplitChunksPlugin demonstrated in Example 2 of SplitChunksPlugin. Lets add optimization.splitChunks with cacheGroups with next params and build:

__webpack.config.js__
``` diff
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Caching'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
+   splitChunks: {
+     cacheGroups: {
+       vendor: {
+         test: /[\\/]node_modules[\\/]/,
+         name: 'vendors',
+         chunks: 'all'
+       }
+     }
+   }
  }
};
```

## 创建 library

除了打包应用程序代码，webpack 还可以用于打包 JavaScript library。

### 创建一个 library

### Todo

访问方式待探索

## shimming








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