const com = require('../common/common'),
  path = require("path");

const readLines = com.readLines;

/*function product() {
  var famCont = com.read('./codeFac.fam'),
    famObj = JSON.parse(famCont),
    template = famObj.template,
    args = famObj.args,
    resultCont = "",
    temp, replReg;

  args.forEach(function(item) {
    temp = template;
    for (var attr in item) {
      replReg = new RegExp("\\${" + attr + "}", "g");
      temp = temp.replace(replReg, item[attr]);
    }
    resultCont += temp + "\r\n\r\n"
  })

  com.write("./code.js", resultCont);
  console.log("complete");
}*/

/*function product() {
  var famCont = com.read('./codeFac.fam'),
    famObj = JSON.parse(famCont),
    template = famObj.template,
    args = famObj.args,
    resultCont = "",
    temp, replReg, i, j, item;

  for (i = 1; i < 10; i++) {
    for (j = 1; j < 10; j++) {
      item = {
        one: i,
        two: j,
        three: i ^ j
      };
      temp = template;
      for (var attr in item) {
        replReg = new RegExp("\\${" + attr + "}", "g");
        temp = temp.replace(replReg, item[attr]);
      }
      resultCont += temp + "\r\n"
    }
  }

  com.write("./code.js", resultCont);
  console.log("complete");
}*/

function product() {
  var labelReg = /^[\d\w]+/,
    str = '',
    obj = {},
    result = [],
    temp,
    label,
    value;
  readLines('./codeFac.fam', function (line) {
    temp = line.replace(/\s+/g, ' ');
    label = temp.match(labelReg);
    value = temp.replace(label + ' ', '');

    obj = {
      value: label[0],
      name: value
    }
    result.push(obj);

    //    str += "<li val='" + label + "'>$t(\"" + label + "\")</li>\n";
  }, function () {
    console.log(result);
  });
}


exports.product = product;