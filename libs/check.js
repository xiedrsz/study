;
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        window.check = factory();
    }
})(function () {

    // 公共 开始
    /**
     * 常用正则表达式
     * @Param notnull 非空
     */
    var regList = {
        notnull: /\S+/
    };

    /**
     * 遍历对象
     */
    function each(obj, callback) {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    /**
     * 单个检验
     * @Param item string 被检验值
     * @Param auth 测试对象
     */
    function check_item(item, auth) {
        var reg = regList[auth] || auth;
        if (item !== undefined && reg.test(item)) {
            return true;
        }

        return false;
    }
    // 公共 结束

    // 初始化回调函数
    var callback = function (mess) {
        console.log(mess);
    }

    /**
     * 设置回调
     * @Param cb function 回调函数
     */
    function setCB(cb) {
        callback = cb;
    }

    /**
     * 校验
     * @Param obj object 被校验对象
     * @Param testObj object 测试对象
     */
    function check(obj, testObj) {
        var auth, messList, i, len, flag, mess;
        each(testObj, function (label, value) {
            auth = testObj[label].auth;
            messList = testObj[label].mess;

            // 遇到 对象 或 对象数组
            if (!auth) {
                var type = toString.call(obj[label]);
                if (type === "[object Object]") {
                    flag = check(obj[label], testObj[label]);
                    if (!flag) {
                        return false;
                    }
                } else if (type === "[object Array]") {
                    len = obj[label].length;

                    // 数组不能为空
                    if (!len && testObj[label][0].musthasval) {
                        !!callback && callback(testObj[label][0].mess);
                        flag = false;
                        return false;
                    }

                    for (i = 0; i < len; i++) {
                        flag = check(obj[label][i], testObj[label][0].model);
                        if (!flag) {
                            return false;
                        }
                    }
                }
                return;
            }

            // 正常情况
            len = auth.length;
            for (i = 0; i < len; i++) {
                flag = check_item(obj[label], auth[i]);
                if (!flag) {
                    mess = messList[i] || messList[0];
                    // callback
                    !!callback && callback(mess);
                    return false;
                }
            }
        });

        return flag;
    }


    // 测试 开始
    var obj = [{
        dd: 'kk',
        kk: ''
    }];

    var testObj = [{
        dd: {
            auth: ["notnull"],
            mess: ["dd不能为空"]
        },
        kk: {
            auth: [/\S+/],
            mess: ["kk不能为空"]
        }
        }];
    var result = check(obj, testObj);
    console.log(result);
    // 测试 结束



    return {
        check: check,
        setCB: setCB
    }
});