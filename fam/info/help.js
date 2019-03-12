var com = require('../common/common');

var dir = __dirname,
	helpMess = com.read(dir + '/help.txt');

function show() {
	console.log(helpMess);
}

exports.show = show;