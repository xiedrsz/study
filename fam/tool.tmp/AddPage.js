// 添加页面
/**
 * 业务逻辑
 * 一个完整的页面一般包含控制器Controller、页面view、配置路由Router、注册控制器文件
 * [1] 
 */

var events = require("events"),
    util = require("./util.js"),
    common = require("./common.js");

var TmpBase = 'D:/My Document/Study/fam/', // 模板库路径
    viewTmp = common.read(TmpBase + 'TmpBase/page/test.html'),
    ctrlTmp = common.read(TmpBase + 'TmpBase/page/testCtrl.js'),
    routTmp = common.read(TmpBase + 'TmpBase/page/router.js'),
    moduleName, modulePath, moduleContent, routContent,
    pageEvent = new events.EventEmitter();

// 事件1：生成页面
pageEvent.on('NewPage', function (moduleName, pageName) {
    var view = util.modify(viewTmp, ['Test'], [pageName]),
        vfile = modulePath + '/html/' + pageName + '.html',
        cfile = pageName + 'Ctrl',
        ctrl = util.modify(ctrlTmp, ['testCtrl'], [cfile]);

    common.write(vfile, view);
    common.write(modulePath + '/controller/' + cfile + '.js', ctrl);
    pageEvent.emit('EditModule', 'controller/' + cfile);
    pageEvent.emit('EditRouter', moduleName, pageName);
});

// 事件2： 编辑module.js文件
pageEvent.on('EditModule', function (filePath) {
    var pathTmp = ",\n\t'./" + filePath + "'//AddFileHere";
    moduleContent = util.modify(moduleContent, ['//AddFileHere'], [pathTmp]);
});

// 事件3：编辑router.js文件
pageEvent.on('EditRouter', function (moduleName, page) {
    var Temp = util.modify(routTmp, ['test', 'test', 'test', 'test', 'test'], [page, page, moduleName, page, page]);
    routContent = util.modify(routContent, ['//AddRouterHere'], [Temp]);
});

// 事件4： 收工
/**
 * [1] 将修改的内容写入module.js
 * [2] 将修改的内容写入router.js
 */
pageEvent.on('AddFinish', function () {
    common.write(modulePath + '/module.js', moduleContent);
    common.write(modulePath + '/other/router.js', routContent);
});

function initConfig(moduleName) {
    moduleName = moduleName;
    modulePath = './dist/templates/' + moduleName;
    moduleContent = common.read(modulePath + '/module.js');
    routContent = common.read(modulePath + '/other/router.js');
}

function addpages(args) {
    if (args.length > 1) {
        initConfig(args[0]);
        for (var i = 1; i < args.length; i++) {
            pageEvent.emit('NewPage', args[0], args[i]);
        }
        pageEvent.emit('AddFinish');
    } else {
        console.log('Please input the module and pages.Try Again!!');
    }
}

exports.addpages = addpages;