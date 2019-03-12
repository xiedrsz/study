const com = require('../common/common'),
  path = require("path"),
  message = require("./messages");

// 控制器
//var dir = __dirname + './../test/',
//	ctrlCnt = com.read(dir + 'controller.js'),
//	ctrlReg = /\.controller((?!\.controller)[\w\W])*/g,
//	ctrlModel = 'define(["app"], function (app) {\n   app[content];\n  });',
//	ctrlNReg = /\.controller\([\'\"]([a-zA-Z]+)[\'\"]\,/;

// 服务
var dir = __dirname + './../test/',
  ctrlCnt = com.read(dir + 'controller.js'),
  ctrlReg = /\.factory((?!\.factory)[\w\W])*/g,
  ctrlModel = 'define(["app"], function (app) {\n   app[content];\n  });',
  ctrlNReg = /\.factory\([\'\"]([a-zA-Z]+)[\'\"]\,/;

function breakUp() {

  // 搜索控制器
  var ctrlLists = ctrlCnt.match(ctrlReg),
    i = 0,
    len = ctrlLists.length,
    ctrlContent, ctrlName, famFile;

  for (; i < len; i++) {
    // 拼接控制器
    ctrlContent = ctrlModel.replace("[content]", ctrlLists[i]);

    // 获取控制器名字
    ctrlName = ctrlLists[i].match(ctrlNReg);
    ctrlName = !!ctrlName ? ctrlName[1] : ("dontcatchname" + i);
    // famFile = dir + 'controllers/' + ctrlName + '.js';
    famFile = dir + 'services/' + ctrlName + '.js';

    com.write(famFile, ctrlContent);
  }

  console.log("OK");
}
// ------------------------------------------------------------------------------------------
var html_dir = dir + "html",
  bindReg = /{{\s*(\w+)\s*}}/g,
  imgReg = /src=[\'\"]+([\w\/\.]+)[\'\"]+/g,
  megReg = /Messages\.(\w+)/g,
  ctrl_dir = dir + "test";

// 取消 messages 中文简繁体转换
function htmlchange() {
  com.traverse(ctrl_dir, function (path) {
    var fileCnt = com.read(path),
      arr, item, name, replace;

    while ((arr = bindReg.exec(fileCnt)) != null) {
      item = arr[0];
      name = arr[1];

      if (replace = message.Messages[name]) {
        fileCnt = fileCnt.replace(item, replace);
      }
    }

    /*var fileCnt = com.read(path),
      arr, oldsrc, newsrc, item, newitem;

    while ((arr = imgReg.exec(fileCnt)) != null) {
      item = arr[0];
      oldsrc = arr[1];
      newsrc = "assets/" + oldsrc;
      newitem = item.replace(oldsrc, newsrc);
      fileCnt = fileCnt.replace(item, newitem);
    }*/

    /*var fileCnt = com.read(path),
      arr, name, replace, item;

    while ((arr = megReg.exec(fileCnt)) != null) {
      item = arr[0];
      name = arr[1];
      replace = '"' + message.Messages[name] + '".tran()';
      fileCnt = fileCnt.replace(item, replace);
    }*/

    com.write(path, fileCnt);
  });
}

// -------------------------------------------------------------------------------------------
// 替换图片路径

function imgchange() {
  var kk = 'src="img/logo2.png"klklklsrc="img/logo2.png"',
    arr, oldsrc, newsrc, item, newitem;

  while ((arr = imgReg.exec(kk)) != null) {
    item = arr[0];
    oldsrc = arr[1];
    newsrc = "assets/" + oldsrc;
    newitem = item.replace(oldsrc, newsrc);
    kk = kk.replace(item, newitem);
  }

  console.log(kk);
}

// -----------------------------------------------------------------------------------------
// 控制器中的 Messages



function megchange() {
  var kkkj = "(Messages.app_Internet_err ,";

  var arr = megReg.exec(kkkj);

  var item = arr[0],
    name = arr[1],
    replace = '"' + message.Messages[name] + '".tran()';

  kkkj = kkkj.replace(item, replace);
  console.log(kkkj);
}









exports.breakUp = htmlchange;