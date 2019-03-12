//cordova.define("com.xiedrsz.xfyspeech.Speech", function(require, exports, module) {...});
var exec = require('cordova/exec');

module.exports = {
    action: function (successCallback, errorCallback) {
        exec(successCallback, errorCallback, "Myplugin", "action", []);
    }
};