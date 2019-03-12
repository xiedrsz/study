'use strict';
let Schema = require("../table/schemadir.js");

/**
 * 插入新条目
 * @Param item object 新条目，键值对
 * @Param successCB Function 成功回调
 * @Param errorCB Function 错误回调
 */
function insert(item, successCB, errorCB) {

}

/**
 * 查询字段
 * @Param name string 字段名
 * @Param successCB Function 成功回调
 * @Param errorCB Function 错误回调
 */
function find(name, successCB, errorCB) {

}

/**
 * 更新字典
 * @Param item object 被更新条目，键值对
 * @Param successCB Function 成功回调
 * @Param errorCB Function 错误回调
 */
function update(item, successCB, errorCB) {

}

exports.insert = insert;
exports.find = find;
exports.update = update;