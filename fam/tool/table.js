/**
 * 功能描述： 新建表
 * 功能产出： 生成表文件
 *
 * 表文件 描述：
 *    表文件 是表思想的核心文件，目前已创建两种类型的表
 * [1] amd 模式
 * [2] 支持 angular.js 的 amd 模式
 *
 * 新建表的工作流程：
 * [1] 读取工程的 .fam 文件
 * [2] 从文件中获取 table 的目录及类型
 * [3] 读取 table 模版
 * [4] 从命令中获取 table 的内容并修改
 * [5] 生成 table 文件
 *
 * 备注：
 * [2016-11-02] 目前只初步完成 amd 模式的表的创建 (针对于 vue 项目)
 **/

const com = require('../common/common'),
    path = require("path");

var tableInfo = {
    type: ''
};

// 获取 table 目录及类型
/**
 * @Param famObj fam对象
 */
function init(famObj) {
    var type = famObj.type;
    (type == 'vue') && (tableInfo.type = '.amd');

    tableInfo.dir = famObj.catalogue.table;
}

// 读取模版，并修改
/**
 * @Param name 表名
 */
function modify(name) {
    var filePath = path.normalize(__dirname + './../TmpBase/table/table' + tableInfo.type + '.js'),
        cont = com.read(filePath);

    tableInfo.name = name;
    tableInfo.content = cont.replace(/table/g, name);
}

// 生成 table 文件
function create() {
    var name = tableInfo.dir + '/' + tableInfo.name + '.js';
    com.write(name, tableInfo.content);

    console.log("\nTable named " + tableInfo.name + " has been created!!");
}

// 新建表
function add(args) {
    var famObj = com.resolvefam();
    init(famObj)

    modify(args[1]);
    create();
}
/* ------------------------------------------------------------------------------------------------------------------- */
// 暴露接口
exports.add = add;