// 编辑页面
/**
 * 业务流程
 * 逐行读取代码，将相关的关键字替换，
 * 注：目前只支持同一时间编辑一个页面 --- 2016-04-01
 */
var events = require("events"),
    common = require("./common.js"),
    util = require("./util.js"),
    colors = require('colors');

var pageContent = "",
    formObj = {
        editInput: "input||",
        editSelect: "select||",
        editIdentify: "identify||",
        editButton: "button||",
        editRow: "row||",
        editRInBtn: "inbtn||",
        editRadio: "radio||"
    }, // 注： formObj中元素的值不能有包含关系，即其值不能是其他值的子字符串
    TmpDir = './dist/templates/', // 项目templates目录路径
    fileDir = "",
    editEvent = new events.EventEmitter();

// 分发任务
function distribute(line) {
    for (var item in formObj) {
        if (line.indexOf(formObj[item]) > -1) {
            editEvent.emit(item, line);
            return;
        }
    }
    pageContent += line + '\n\t';
}

// 编辑结束
function editEnd() {
    common.write(fileDir, pageContent);
    console.log('Edit page finished!!'.magenta);
}

/* ****************************************************************** 控件编辑区 **************************************************** */
// 编辑input
// 例子： input||真实姓名||formData.realName
editEvent.on('editInput', function (line) {
    console.log("Found an input!!".green);
    var form = line.trim().split("||"),
        content = '<label class="item item-input">\n\t<span class="input-label">' + form[1] + '</span>\n\t<input type="text" ng-model="' + form[2] + '" />\n\t</label>\n\t';

    pageContent += content;
});

// 编辑select
// 例子：select||验证方式||formData.identifyType
editEvent.on('editSelect', function (line) {
    console.log("Found an select!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<label class="item item-input item-select">\n\t<span class="input-label">[?]</span>\n\t<select style="width: 100%;direction: inherit;right: initial;padding-left: 0" ng-model="[?]">\n\t<option value="">默认</option>\n\t</select>\n\t</label>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

// 编辑验证码identify
editEvent.on('editIdentify', function (line) {
    console.log("Found an identify!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<div class="item item-input item-button-right">\n\t<span class="input-label">验证码</span>\n\t<input type="text" placeholder="请输入右图中的字符" ng-model="[?]" />\n\t<div id="" class="vCode"></div>\n\t</div>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

// 编辑按钮 button
editEvent.on('editButton', function (line) {
    console.log("Found an button!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<button class="button button-positive w-100 mgt-2" ng-click="[?]">[?]</button>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

// 编辑行 row
// 例子： row||kkk
editEvent.on('editRow', function (line) {
    console.log("Found an row!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<div class="row">[?]</div>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

/*

            */
// 编辑右侧按钮 inbtn
// 例子：inbtn||手机动态码||formData.dCode||send()||发送
editEvent.on('editRInBtn', function (line) {
    console.log("Found an inbtn!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<div class="item item-input item-button-right">\n\t<span class="input-label">[?]</span>\n\t<input type="text" ng-model="[?]" />\n\t<button class="button button-energized h-100 t-r" ng-click="[?]">[?]</button>\n\t</div>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

// 编辑单选按钮 
// 例子： radio||payType||0||formData.payType||支付宝网页支付
editEvent.on('editRadio', function (line) {
    console.log("Found an radio!!".green);
    var form = line.trim().split("||").slice(1, 9999),
        content = '<label class="item item-radio">\n\t<input type="radio" name="[?]" ng-value="[?]" ng-model="[?]">\n\t<div class="item-content">[?]</div>\n\t<i class="radio-icon ion-checkmark assertive"></i>\n\t</label>\n\t';

    content = util.insertParam(content, form);
    pageContent += content;
});

/* ****************************************************************** 控件编辑区 **************************************************** */

// 对外暴露接口
function editpage(args) {
    fileDir = TmpDir + args[0] + '/html/' + args[1] + '.html';

    common.readLines(fileDir, distribute, editEnd);
}

exports.editpage = editpage;