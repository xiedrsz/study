'use strict';
/**
 * 支出账单
 */
let mongoose = require('../db.js'),
  Schema = mongoose.Schema,
  TableSchema = new Schema({
    // 字段列表
    /*
    date: {
      type: String
    }
    */
  });

module.exports = mongoose.model('Table', TableSchema);