// 移除页面
/**
 * 业务流程
 * 一个完整的页面一般包含控制器Controller、页面view、配置路由Router、注册控制器文件，
 * 所涉及到的文件有XXCtrl.js、XX.html、router.js、module.js,
 * 因此删除一个页面的流程应如下：
 * [1] 从router.js文件中移除该页面的路由配置；
 * [2] 从module.js文件中移除XXCtrl.js文件的登记信息；
 * [3] 移除XXCtrl.js文件和XX.html文件
 * 路由配置的正则表达式如下：
 * /(.state\('menu.Login',)(.*)\)/ig
 */
var events = require("events"),
    util = require("./util.js"),
    common = require("./common.js"),
    page = require('./AddPage.js'),
    colors = require('colors');

var TmpDir = './dist/templates/', // 项目templates目录路径
    moduleName, routerdir, moduledir, rContent, mContent,
    rmPageEvent = new events.EventEmitter();

// 事件1：修改router.js文件
rmPageEvent.on('ERouter', function (pageName) {
    var module = "menu." + pageName,
        re = new RegExp("(.state\\('" + module + "',)[^\\)]*\\)", "ig");

    rContent = rContent.replace(re, "");
});

// 事件2：修改module.js文件
rmPageEvent.on('EModule', function (pageName) {
    var temp = "'./controller/" + pageName + "Ctrl',\n"

    mContent = mContent.replace(temp, "");
});

// 事件3：删除XXCtrl.js文件和XX.html文件
rmPageEvent.on('RmFile', function (pageName) {
    var fileList = [
        TmpDir + moduleName + '/html/' + pageName + '.html',
        TmpDir + moduleName + '/controller/' + pageName + 'Ctrl.js'
    ];

    common.delect(fileList);
});

// 事件4：收工
/**
 * 收工工作：
 * 重新写入router.js文件和module.js文件
 */
rmPageEvent.on('Finish', function () {
    common.write(routerdir, rContent);
    common.write(moduledir, mContent);

    console.log("The files belowing have been modified: ".magenta);
    console.log(routerdir.magenta);
    console.log(moduledir.magenta);
});

function removepage(args) {
    // 初始化变量
    moduleName = args[0];
    routerdir = TmpDir + moduleName + '/other/router.js';
    moduledir = TmpDir + moduleName + '/module.js';
    rContent = common.read(routerdir);
    mContent = common.read(moduledir);

    for (var i = 1; i < args.length; i++) {
        rmPageEvent.emit('ERouter', args[i]);
        rmPageEvent.emit('EModule', args[i]);
        rmPageEvent.emit('RmFile', args[i]);
    }
    rmPageEvent.emit('Finish');
}

/*var args = ['index', 'index'];
removepage(args);*/

exports.removepage = removepage;