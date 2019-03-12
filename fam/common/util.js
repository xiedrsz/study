/**
 * 获取当前目录以及命令控制台输入的参数列表
 * return Object
 * { dir : "当前目录",
 *   args: ["参数列表数组"]
 * }
 */
function argv() {
	var result = {},
		temp = process.argv,
		tt = temp[1],
		lindex = tt.lastIndexOf('\\'),
		length = temp.length;

	result.dir = tt.substr(0, lindex);
	result.func = temp[2];
	result.args = temp.slice(3, length);

	return result;
}
// -------------------------------------------------------------------------
/**
 * 修改内容
 * @Param content String 要修改的内容
 * @Param patternPos StringArray  要修改的位置
 * @Param replacementPos StringArray  要修改的内容
 */
function modify(content, patternPos, replacementPos) {
	var result = content,
		i;
	for (i = 0; i < patternPos.length; i++) {
		result = result.replace(patternPos[i], replacementPos[i]);
	}
	return result;
}
// -----------------------------------------------------------------------
// 向字符串中插入参数
/**
 * 向字符串中插入参数
 * @Param str 要进行修改的字符串
 * @Param args 参数列表
 */
function insertParam(str, args) {
	var result = str,
		i;
	for (i = 0; i < args.length; i++) {
		result = result.replace('[?]', args[i]);
	}
	return result;
}

exports.insertParam = insertParam;
exports.modify = modify;
exports.argv = argv;