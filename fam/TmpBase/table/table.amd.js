define([], function () {
	'use strict';
	var table = {};

	/**
	 * 表字段
	 *
	 */

	// 稳定数据
	table.param = {};

	// 临时数据
	table.temp = {};

	// 读取器
	table.getter = function (attr) {
		return this.temp[attr];
	};

	// 设置器
	table.setter = function (attr, value) {
		this.temp[attr] = value;
		return this;
	};

	// 设置多个参数
	/**
	 * @Param data 数据源
	 * @Param attr1 
	 * @Param attr2
	 */
	table.setmore = function () {
		// 未完成
	};

	// 校验
	table.check = function () {

	};
});