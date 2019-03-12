require.config({
	//定义基础路径，其他的path等路径是基于基础路径进行引入的。如果不配置，默认为引入requireJS页面所在的位置
	baseUrl: "./",

	//requirejs默认对文件进行js扩展名处理，如果加上js或者以http、https开头，则不处理
	paths: {
		//定义组件名称，以及组件js所在的路径
		mock: './libs/mock',
		jquery: './libs/jquery-2.1.1.min',
		angular: './libs/ionic.bundle.min'
	},
	//这个配置是你在引入依赖的时候的包名
	shim: {
		"angular": {
			exports: "angular"
		},
		"autocomplete": ["jquery"],
		"date": ["jquery", "iscroll"]
	}
});
define(["angular", "app", "reg", "weixin"], function (angular, app, reg, wx) {
	//angularjs 启动
	angular.bootstrap(document, ['FHTApp']);

	console.log(wx);
});
