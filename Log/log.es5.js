"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * @Description 日志系统
 *  本系统不仅仅是监听系统异常，也包括其他必要的日志
 *
 * 属性说明
 * @Param logNode Dom 日志操作界面
 */

var Reporter = function () {
  /**
   * @Function 构造器
   * @Param option function 异常回调
   */
  function Reporter(_option) {
    _classCallCheck(this, Reporter);

    var data = localStorage.getItem("logData");

    // 初始化数据
    this.data = !!data ? JSON.parse(data) : {
      devMod: true,
      inspected: false
    };
    this.save(_option);

    // 初始化操作界面
    initForm.call(this);

    // 启动功能
    this.data.devMod && this.openDev();
    this.data.inspected && this.openInspect();
  }

  /**
   * @Function 保存数据
   * @Param obj object 新数据
   */


  _createClass(Reporter, [{
    key: "save",
    value: function save() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var prop in obj) {
        this.data[prop] = obj[prop];
      }

      localStorage.setItem("logData", JSON.stringify(this.data));
    }

    /**
     * @Function 发送日志
     * @Param log object 日志信息
     */

  }, {
    key: "send",
    value: function send(log) {
      console.log(log.name);
      console.log(log.stack);
      console.log(log.message);
    }

    // 启动监听

  }, {
    key: "listen",
    value: function listen() {
      console.log("启动监听");

      // 关闭监听
      this.stop = function () {};
    }

    // 查看日志

  }, {
    key: "view",
    value: function view() {
      console.log("查看日志");
      this.logNode.style.display = "block";
      if (this.data.inspected) {
        document.getElementById("log_inspect").innerHTML = "Remove";
      } else {
        document.getElementById("log_inspect").innerHTML = "Add";
      }
    }

    // 关闭查看窗口

  }, {
    key: "closePop",
    value: function closePop() {
      console.log("关闭查看窗口");
      this.logNode.style.display = "none";
    }

    // 开启开发模式

  }, {
    key: "openDev",
    value: function openDev() {
      var log = this,
        times = 0,
        timer = void 0;

      function bodyhandle(event) {
        times++;
        if (times > 5) {
          log.view();
        }

        if (!timer) {
          timer = window.setTimeout(function () {
            times = 0;
            clearTimeout(timer);
            timer = null;
          }, 1000);
        }
      }
      document.body.addEventListener('click', bodyhandle, false);

      // 关闭开发模式
      this.closeDev = function () {
        document.body.removeEventListener("click", bodyhandle, false);
      };
    }

    // 打开inspect

  }, {
    key: "openInspect",
    value: function openInspect() {
      var _this = this;

      console.log("打开inspect");
      if (!this.data.server) {
        return;
      }

      var scriptNode = document.createElement("script");
      scriptNode.src = this.data.server + "/target/target-script-min.js#anonymous";
      document.body.appendChild(scriptNode);
      this.closePop();
      this.save({
        inspected: true
      });

      // 移除inspect
      this.removeInspect = function () {
        console.log("移除inspect");
        scriptNode.remove();
        _this.save({
          inspected: false
        });
        document.getElementById("log_inspect").innerHTML = "Add";
      };
    }
  }]);

  return Reporter;
}();

/**
 * @Function 初始化表单
 */


function initForm() {
  // 操作界面
  var innerHtml = '<div style="padding: 10px;background: #fff;position: absolute;width: 90%;top: 34%;z-index:999;">' + '<div style="text-align: center;padding: 5px;line-height: 2em;border-bottom: 1px solid #ccc;position: relative;">' + '<div>日志系统</div>' + '<div id="log_close" style="position: absolute;right: 10px;top: 5px;color: #999;">关闭</div>' + '</div>' + '<div style="padding: 5px;">' + '<div style="display: flex;">' + '<span>Inspect:</span>' + '<div style="flex: 1;padding: 0 10px;">' + '<input id="log_server" type="text" style="width: 95%;" />' + '</div>' + '<a id="log_inspect" style="width: 80px;text-align: center;background: #44f;border-radius: 3px;color: #fff;">Add</a>' + '</div>' + '</div>' + '</div>',
    logNode = document.createElement("div"),
    thisTmp = this;

  logNode.style.display = "none";
  logNode.innerHTML = innerHtml;
  document.body.appendChild(logNode);
  this.logNode = logNode;

  // 事件
  document.getElementById("log_close").addEventListener("click", function () {
    thisTmp.closePop();
  }, false);
  document.getElementById("log_inspect").addEventListener("click", function () {
    if (thisTmp.data.inspected) {
      thisTmp.removeInspect();
    } else {
      var server = document.getElementById("log_server").value;
      thisTmp.save({
        server: server
      });
      thisTmp.openInspect();
    }
  }, false);
}

// export default Reporter