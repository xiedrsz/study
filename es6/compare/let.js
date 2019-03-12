// var
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10

// let
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6

// var
"use strict";

var a = [];

var _loop = function _loop(i) {
    a[i] = function () {
        console.log(i);
    };
};

for (var i = 0; i < 10; i++) {
    _loop(i);
}
a[6](); // 6
// =================================================================================================================

// let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。
// 如：
//console.log(foo); // 输出undefined
//console.log(bar); // 报错ReferenceError
//
//var foo = 2;
//let bar = 2;

// 注：目前经babel转换后未能像上述描述那样, 但在支持es6的浏览器中和上述描述一致

// =================================================================================================================

// 暂时性死区
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

// var tmp = 123;
//
// if (true) {
//   tmp = 'abc'; // ReferenceError
//   let tmp;
// }

// 注： babel上未能实现

// =================================================================================================================

var tmp = new Date();

function f() {
    console.log(tmp);
    if (false) {
        var tmp = "hello world";
    }
}

f(); // undefined

function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log(n);
}

f1(); // 5

// =================================================================================================================

var s = 'hello';

for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
}

console.log(i); // 5

var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined