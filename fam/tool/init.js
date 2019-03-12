/**
 * 功能描述： 初始化工程
 * 功能产出: .fam 文件
 *
 * .fam 文件描述：
 *    .fam 文件记载着该工程的各种信息，为 build 等模块提供项目的相关信息，从而达到快速构建工程的效果；
 * 不同类型的项目 .fam 文件不尽相同，每种类型的 .fam 文件都会有相应的模版，它们都应包含以下内容：
 * [1] 项目名称
 * [2] 项目类型
 * [3] 目录结构及目录位置
 *
 * 工程初始化工作流程：
 * [1] 询问项目类型
 * [2] 根据项目类型读取相应的 .fam 模版
 * [3] 询问项目名称 => 结束询问
 * [4] 生成项目的 .fam 文件
 **/

const com = require('../common/common'),
    events = require("events"),
    path = require("path");

var initEvent = new events.EventEmitter(),
    dir = './',
    famObj = {};

function init() {
    // initEvent.emit('type');
  famObj = []
  
  for (var a = 0; a < 10; a++) {
    for (var b = 0; b < 10; b++) {
      for (var c = 0; c < 10; c++) {
        for (var d = 0; d < 10; d++) {
          var no = '' + a + b + c + d
          famObj.push(no)
        }
      }
    }
  }
  initEvent.emit('create')
  
  
}

/* ------------------------------------------------------------------------------------------------------------------- */
// 事件

// 询问名称
initEvent.on('name', function () {
    com.prompt("Please input the project name", "www").then(result => {
        dir += result;
        famObj.name = result;
        process.stdin.end();

        initEvent.emit('create');
    }, res => {
        console.log(res);
    });
});

// 询问项目类型
initEvent.on('type', function () {
    com.prompt("Please input the type of your project", "vue").then(result => {

        var famPath = path.normalize(__dirname + './../TmpBase/project-' + result + '/.fam'),
            famCont = com.read(famPath);
        famObj = JSON.parse(famCont);

        famObj.type = result;

        initEvent.emit('name');

    }, res => {
        console.log(res);
    });
});

// 生成项目 .fam 文件
initEvent.on('create', function () {
    var famCont = JSON.stringify(famObj, null, 2),
        famFile = dir + '/.fam';
  
  famCont = famObj.join(',')
  
    com.createForlder(dir);
    com.write(famFile, famCont);
    console.log("\nA new fam project had created!!");
});

/* ------------------------------------------------------------------------------------------------------------------- */
// 暴露接口
exports.init = init;