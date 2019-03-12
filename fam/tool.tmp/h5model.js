// html5 与 原始 模式互转
/**
 * 业务流程
 * 这两种模式互转主要涉及到的文件如下：
 * [1] index模块中的router.js文件
 * [2] 大部分html文件
 * 主要操作包括：
 * [1] 将router.js文件中的 $locationProvider.html5Mode(true); 语句释放或注释掉
 * [2] 将html文件中的 href="#menu/.." 与 href="/menu/.." 互转
 * html5模式的状态为：
 * [1] $locationProvider.html5Mode(true); 语句属于释放状态
 * [2] href="/menu/.."
 */
var events = require("events"),
    common = require("./common.js"),
    colors = require('colors');

var source = ".",
    modelEvent = new events.EventEmitter();

// 转成html5模式
function tohtml(file) {
    var content = common.read(file);

    if (content.indexOf('href=\"#menu/') > -1) {
        content = content.replace(/href=\"#menu\//g, 'href=\"/menu/');
        common.write(file, content);

        console.log("The file has been changed to html5 model: ".magenta + file.magenta);
    }
}

// 转成原始模式
function tooriginal(file) {
    var content = common.read(file);

    if (content.indexOf('href=\"\/menu/') > -1) {
        content = content.replace(/href=\"\/menu\//g, 'href=\"#menu/');
        common.write(file, content);

        console.log("The file has been changed to original model: ".green + file.green);
    }
}

// 编辑html文件
modelEvent.on('Ehtml', function (type) {
    if (type == 'html5') {
        common.traversal(".", tohtml);
    } else if (type == 'original') {
        common.traversal(".", tooriginal);
    }
});

// 编辑router文件
modelEvent.on('Erouter', function (type) {
    var file = './dist/templates/index/other/router.js',
        content = common.read(file);

    if (type == 'html5') {
        content = content.replace('//$locationProvider.html5Mode(true);', '$locationProvider.html5Mode(true);');
    } else if (type == 'original') {
        content = content.replace('$locationProvider.html5Mode(true);', '//$locationProvider.html5Mode(true);');
    }

    common.write(file, content);

    console.log("The file named 'router.js' has been modified: ".magenta);
});

function h5model(args) {
    var type = args[0];

    if (type == 'html5' || type == 'original') {
        modelEvent.emit('Erouter', type);
        modelEvent.emit('Ehtml', type);
    }
}

exports.h5model = h5model;