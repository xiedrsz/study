// 添加模块
/**
 * 业务流程
 * 一个完整的模块一般包括控制器controller文件夹、页面html文件夹、其他other文件夹、other文件加下的路由router文件、服务service文件夹以及模块module.js文件
 * 添加一个文件一般需要做的工作就是：
 * [1] 创建以上文件
 * [2] 在项目的reg.js文件中注册本模块
 * [3] 为本模块添加页面
 */
var events = require("events"),
    util = require("./util.js"),
    common = require("./common.js"),
    page = require('./AddPage.js'),
    colors = require('colors');

var TmpBase = 'D:/My Document/Study/fam/TmpBase/module/', // 模板库路径
    moduleTmp = common.read(TmpBase + 'module.js'),
    routerTmp = common.read(TmpBase + 'router.js'),
    
    TmpDir = './dist/templates/', // 项目templates目录路径
    regDir = './dist/js/reg.js', // 项目reg.js文件路径
    
    regContent = common.read(regDir),
    moduleEvent = new events.EventEmitter();

// 事件1：创建模块文件
moduleEvent.on('CModule', function (moduleName) {
    common.createForlder(TmpDir + moduleName);
    common.createForlder(TmpDir + moduleName + '/controller');
    common.createForlder(TmpDir + moduleName + '/html');
    common.createForlder(TmpDir + moduleName + '/other');
    common.createForlder(TmpDir + moduleName + '/service');

    common.write(TmpDir + moduleName + '/other/router.js', routerTmp);
    common.write(TmpDir + moduleName + '/module.js', moduleTmp);

    console.log('The following files were created:');
    console.log(' --------- '.green + moduleName.green);
    console.log('   +------ controller\n   +------ html\n   +------ other\n   + +---- router.js\n   +------ service\n   +------ module.js'.green);
});

// 事件2：编辑项目的reg.js文件
moduleEvent.on('EReg', function (moduleName) {
    var pathTmp = ",\n\t'templates/" + moduleName + "/module'//AddFileHere";
    regContent = util.modify(regContent, ['//AddFileHere'], [pathTmp]);
    console.log("The file called 'reg.js' had been modified!".magenta);
});

// 事件3：为模块添加页面
moduleEvent.on('AddPage', function (moduleName) {
    var args = [moduleName, moduleName];
    page.addpages(args);
});

// 事件4：收工
/**
 * 收工工作如下：
 * [1] 写入reg.js文件
 */
moduleEvent.on('AddFinish', function () {
    common.write(regDir, regContent);
});

function addmodules(args) {
    if (!args || !args.length) {
        console.log('No module has been built!!'.red);
        return;
    }

    for (var i = 0; i < args.length; i++) {
        moduleEvent.emit('CModule', args[i]);
        moduleEvent.emit('EReg', args[i]);
        moduleEvent.emit('AddPage', args[i]);
    }
    moduleEvent.emit('AddFinish');
}

exports.addmodules = addmodules;