/**
 * 功能描述： 新建模块
 * 功能产出： 生成模块文件
 *
 * 模块 描述：
 *    vue 类型项目
 *    [1] vue 类型项目的模块即一个页面
 *
 * 新建模块的工作流程：
 *    vue 类型项目添加模块
 *    [1] 读取工程的 .fam 文件, 获取到项目类型、 module 的目录路径及 module 模版路径
 *    [2] 读取 module 模版
 *    [3] 从命令中获取 module 的内容并修改
 *    [4] 生成 module 文件
 *
 *    vue 类型项目配置模版
 *    [1] 读取工程的 .fam 文件, 获得 famObj 对象
 *    [2] 修改 famObj 对象
 *    [3] 生成 .fam 文件
 *
 * 备注：
 * [2016-11-11] 目前只初步完成 vue 类型项目的模块添加
 *
 * 使用说明：
 *    vue 类型项目
 *    [1] 添加模块 fam module add <Mname1 Mname2 ...>
 *    [2] 修改模块模版路径 fam module template <template file>
 **/

const com = require('../common/common'),
    path = require("path");

var famObj, moduleDir, moduleTmp;

// 初始化 famObj
function initFamObj() {
    famObj = com.resolvefam();
    moduleDir = famObj.catalogue.module.dir;
    moduleTmp = famObj.catalogue.module.template;
}

// 分发任务
function distribute(args) {
    !famObj && initFamObj();

    if (args[0] == "template") {
        template(args);
    } else {
        add(args);
    }
}

// 修改模版路径
function template(args) {
    famObj.catalogue.module.template = args[1];
    var famCont = JSON.stringify(famObj, null, 2);
    com.write('./.fam', famCont);

    console.log("\nModule template has been changed!!");
}

// 添加模块
function add(args) {
    var i = 1,
        len = args.length,
        targetFile;
    for (; i < len; i++) {
        targetFile = moduleDir + '/' + args[i] + '.xvue';
        com.pipefile(moduleTmp, targetFile);
    }
}
/* ------------------------------------------------------------------------------------------------------------------- */
// 暴露接口
exports.distribute = distribute;