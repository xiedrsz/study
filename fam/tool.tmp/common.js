var fs = require('fs'),
    readline = require('readline'),
    stat = fs.stat,
    ph = require('path'),
    colors = require('colors');

/**
 * 读取文件内容
 * @Param file 文件名（包括路径）
 */
function read(file) {
    var data = fs.readFileSync(file, {
        flag: 'r',
        encoding: 'utf8'
    });
    return data;
}
//-----------------------------------------------------------------------------------------------------------------------------------------
/**
 * 复制单个文件，管道的方式
 * @Param sourcefile 源文件
 * @Param targetfile 目标文件
 */
function pipefile(sourcefile, targetfile) {
    var rs = fs.createReadStream(sourcefile),
        ws = fs.createWriteStream(targetfile);
    rs.pipe(ws);

    rs.on('data', function (data) {
        console.log('正在读取文件: ' + sourcefile)
    });
    rs.on('end', function () {
        console.log('文件读取完成: ' + sourcefile);
    });
}

/**
 * 复制目录，管道的方式
 * @Param source 源目录
 * @Param target 目标目录
 */
function pipe(source, target) {

    createForlder(target);

    fs.readdir(source, function (err, paths) {
        if (err)
            throw err;

        paths.forEach(function (path) {
            var _src = source + '/' + path,
                _dst = target + '/' + path;

            stat(_src, function (err, st) {
                if (err)
                    throw err;

                if (st.isFile()) {
                    pipefile(_src, _dst);
                } else if (st.isDirectory()) {
                    pipe(_src, _dst);
                }
            });
        });
    });
}
// -------------------------------------------------------------------------------------------------------------
/**
 * 写入文件，若文件不存在会自动创建
 * @Param file String 文件名（包括路径）
 * @Param content String 文件内容
 */
function write(file, content) {
    fs.writeFileSync(file, content, {
        flag: 'w',
        encoding: 'utf8'
    });
}
// -------------------------------------------------------------------------------------------------------------------
/**
 * 创建目录
 * 创建前先判断改目录是否存在
 * 若不存在则需创建
 * @Param dir 目录路径
 */
function createForlder(dir) {
    var exists = fs.existsSync(dir);

    if (!exists) {
        fs.mkdirSync(dir);
    }
}
// --------------------------------------------------------------------------------------------------------------------------
/**
 * 逐行读取代码
 * @Param file 要读取的文件路径
 * @Param func 读取完一行后的回调函数，接收一个参数：line，即当前行的内容
 * @Param endfunc 文件读取完毕时的回调函数
 */
function readLines(file, func, endfunc) {
    var rl = readline.createInterface({
        input: fs.createReadStream(file)
    });

    rl.on('line', func);

    rl.on('close', endfunc);
}
// -------------------------------------------------------------------------------------------------------------------------
/**
 * 找出文件夹中的所有html文件
 * @Param source String 文件夹名称
 * @Param func Function 找到html文件后的回调函数
 */
function traversal(source, func) {
    var fileType;

    fs.readdir(source, function (err, paths) {
        if (err)
            throw err;

        paths.forEach(function (path) {
            var _src = source + '/' + path;

            stat(_src, function (err, st) {
                if (err)
                    throw err;

                if (st.isFile()) {
                    fileType = ph.extname(_src);
                    if (fileType == ".html") {
                        func(_src);
                    }
                } else if (st.isDirectory()) {
                    traversal(_src, func);
                }
            });
        });
    });
}
// ----------------------------------------------------------------------------------------------------------------------------------------
// 删除文件
/**
 * @Param fileList StringArray 字符串数组，要删除的文件名列表
 */
function delect(fileList) {
    var mess, i;

    for (i = 0; i < fileList.length; i++) {
        fs.unlink(fileList[i], function () {
            mess = 'The file has been deleted: ' + fileList[i];
            console.log(mess.red);
        });
    }
}

exports.delect = delect;
exports.traversal = traversal;
exports.readLines = readLines;
exports.createForlder = createForlder;
exports.write = write;
exports.pipefile = pipefile;
exports.pipe = pipe;
exports.read = read;