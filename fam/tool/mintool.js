const com = require('../common/common'),
  path = require("path");

var dir = __dirname + './../test/weui';

function changeExe() {
  com.traverse(dir, function (path) {
    var newPath = path.replace("wxss", "less");
    if (path != newPath) {
      com.pipefile(path, newPath);
      com.delect([path]);
    }
  });
  console.log("finished!!");
}

exports.mintool = changeExe;