const com = require('../common/common'),
  path = require("path");

var deviates = [];

/**
 * @Description 整理历史行情记录，数据来源于 新浪财经
 * @Return Array eg: [[O, H, C, L], ...]
 */
function getHis() {
  var famCont = com.read('./codeFac.fam'),
    reg = /\d+\.\d+/g,
    arr = famCont.match(reg),
    len = arr.length,
    result = [],
    i = 0,
    temp;

  for (; i < len; i++) {
    if (i % 4 === 0) {
      !!temp && result.push(temp);
      temp = [];
    }
    temp.push(arr[i] - 0);
  }
  result.push(temp);

  return result;
}

/**
 * @Description 计算参数组合
 * @Param arr Array 元素集合 eg: [1,2]
 * @Param n Number 排列数 eg: 4
 * @Return Array eg: [[1, 1, 1, 1], ...]
 */
function calc(arr, n) {
  if (!n) {
    console.error("The param of n is not defined");
    return;
  }

  if (n === 1) {
    return arr;
  }

  var prev = calc(arr, n - 1),
    result = [],
    temp;

  arr.forEach(function(item) {
    prev.forEach(function(tmp) {
      temp = [];
      temp = temp.concat(tmp, item);
      result.push(temp);
    });
  });

  return result;
}

/**
 * @Description 数据的离散程度
 * @Param args Array 数组
 * @Return Object {average, variance}
 */
function disperse(args) {
  if (toString.call(args) === "") {
    console.log("The param of args must be an Array!");
    return;
  }

  var len = args.length,
    average,
    variance,
    result;

  average = args.reduce(function(prev, next) {
    return prev + next;
  });

  average /= len;

  variance = args.reduce(function(prev, next, index) {
    if (index === 1) {
      return Math.pow(prev - average, 2) + Math.pow(next - average, 2);
    } else {
      return prev + Math.pow(next - average, 2);
    }
  });

  variance /= (len - 1);

  return {
    average: average.toFixed(2),
    variance: variance.toFixed(4)
  };
}

/**
 * @Description 计算自定义 MCDP
 * @Param history Array 历史行情记录 eg: [[O, H, C, L]]
 * @Param params Array 参数 eg: [a, b, c, d]
 * @Param option Object 选项 eg: {type}
 * @Return Array eg:[1, 1, 0, 1, 0, ...]
 */
function mcdp(history, params, option) {
  var result,
    open, high, close, low, cdp, cdp_h, deviate,
    a = params[0],
    b = params[1],
    c = params[2],
    d = params[3],
    sum = a + b + c + d,
    len = history.length - 1;

  result = history.map(function(item, i) {
    if (i < len) {
      open = history[i + 1][0];
      high = history[i + 1][1];
      close = history[i + 1][2];
      low = history[i + 1][3];
      cdp = (open * a + high * b + close * c + low * d) / sum;
      cdp_h = 2 * cdp - low;
      deviate = item[1] - cdp_h;

      if (deviate > 0) {
        deviates.push(deviate);
        return 1;
      } else {
        return 0;
      }
      //return (item[1] > cdp_h) - 0;
    } else {
      return 0;
    }
  });

  return result;
}

/**
 * @Description 计算CDP的近高价
 * @Param history Array 历史行情记录 eg: [[O, H, C, L]]
 * @Param params Array 参数 eg: [a, b, c, d]
 * @Return Array eg:[1, 1, 0, 1, 0]
 */
function CDPh(history, params) {
  var result,
    open, high, close, low, cdp, cdp_h, deviate,
    a = params[0],
    b = params[1],
    c = params[2],
    d = params[3],
    sum = a + b + c + d,
    len = history.length - 1;

  result = history.map(function(item, i) {
    if (i < len) {
      open = history[i + 1][0];
      high = history[i + 1][1];
      close = history[i + 1][2];
      low = history[i + 1][3];
      cdp = (open * a + high * b + close * c + low * d) / sum;
      cdp_h = 2 * cdp - low;
      deviate = item[1] - cdp_h;

      if (deviate > 0) {
        deviates.push(deviate);
        return 1;
      } else {
        return 0;
      }
      //return (item[1] > cdp_h) - 0;
    } else {
      return 0;
    }
  });

  return result;
}

/**
 * @Description 计算CDP的近低价
 * @Param history Array 历史行情记录 eg: [[O, H, C, L]]
 * @Param params Array 参数 eg: [a, b, c, d]
 * @Return Array eg:[1, 1, 0, 1, 0]
 */
function CDPl(history, params) {
  var result,
    open, high, close, low, cdp, cdp_h, deviate,
    a = params[0],
    b = params[1],
    c = params[2],
    d = params[3],
    sum = a + b + c + d,
    len = history.length - 1;

  result = history.map(function(item, i) {
    if (i < len) {
      open = history[i + 1][0];
      high = history[i + 1][1];
      close = history[i + 1][2];
      low = history[i + 1][3];
      cdp = (open * a + high * b + close * c + low * d) / sum;
      cdp_l = 2 * cdp - high;
      deviate = cdp_l - item[3];

      if (deviate > 0) {
        deviates.push(deviate);
        return 1;
      } else {
        return 0;
      }
      //return (item[1] > cdp_h) - 0;
    } else {
      return 0;
    }
  });

  return result;
}

/**
 * @Description 计算 CDP 的顶低价
 * @Param history Array 历史行情记录 eg: [[O, H, C, L]]
 * @Param params Array 参数 eg: [a, b, c, d]
 * @Return Array eg:[1, 1, 0, 1, 0]
 */
function CDPal(history, params) {
  var result,
    open, high, close, low, cdp, cdp_h, deviate,
    a = params[0],
    b = params[1],
    c = params[2],
    d = params[3],
    sum = a + b + c + d,
    len = history.length - 1;

  result = history.map(function(item, i) {
    if (i < len) {
      open = history[i + 1][0];
      high = history[i + 1][1];
      close = history[i + 1][2];
      low = history[i + 1][3];
      cdp = (open * a + high * b + close * c + low * d) / sum;
      cdp_al = cdp - high + low;
      deviate = item[3] - cdp_al;

      if (deviate > 0) {
        deviates.push(deviate);
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });

  return result;
}

/**
 * @Description 分类
 * @Param history Array 历史行情记录 eg: [[O, H, C, L]]
 * @Return Array eg:[[YO, YH, YC, YL, O, H, C, L]]
 * @Note 貌似没有价值
 */
function classify(history) {
  var result = [],
    temp;

  history.forEach(function(item, index) {
    if (history[index + 1] && history[index + 1][0] < history[index + 1][2]) {
      temp = history[index + 1].concat(item);
      result.push(temp);
    }
  });

  console.log(result.length);

  return result;
}

exports.calc = function() {
  var his = getHis(),
    params = calc([1, 2], 4),
    len = his.length,
    cdp,
    sum,
    dis;

  console.log(len);

  params.forEach(function(item) {
    // cdp = CDPal(his, item);
    cdp = CDPl(his, item);
    dis = disperse(deviates);
    deviates = [];

    sum = cdp.reduce(function(prev, next) {
      return prev + next;
    });

    console.log(item + ": " + sum + "\t" + dis.average + "\t" + dis.variance);
  });
};