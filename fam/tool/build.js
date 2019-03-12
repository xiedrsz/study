const com = require('../common/common'),
	path = require("path");

function build() {
	var famCont = com.read('./.fam'),
		famObj = JSON.parse(famCont),
		sourceDir = path.normalize(__dirname + './../TmpBase/project-' + famObj.type),
		targetDir = './';

	com.pipe(sourceDir, targetDir);

	console.log('A new fam project of ' + famObj.type + ' has been building!!');
}

exports.build = build;