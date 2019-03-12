define(['app'], function (services) {
    'use strict';
    services.factory('yunService', function (session_service, http_service, convert_service) {
        var yun = {};

        /**
         * 表字段
         * userCode 用户编码
         * pcisDeptCode 出单机构代码
         * pcisDeptName 出单机构名称
         * departmentCode 机构编码
         * employeeCode 业务员编码
         * employeeName 业务员姓名
         * employeeChannel 业务员渠道
         * channelSourceCode 渠道来源编码
         * channelSourceName 渠道来源名称
         * channelSourceDetailCode 渠道来源细分编码
         * channelSourceDetailName 渠道来源细分名称
         * businessSourceCode 业务来源编码
         * businessSourceName 业务来源名称
         * businessSourceDetailCode 业务来源细分编码
         * businessSourceDetailName 业务来源细分名称
         * brokerCode 经纪人编码
         * brokerName 经纪人名称
         * agentCode 代理人代码
         * agentName 代理人名称
         * agentProtocolCode 代理人协议编号
         * agentProtocolName 代理人协议名称
         * cooperateCode 合作网点代码
         * cooperateName 合作网点名称
         * autoDealerCode 车商编码
         * autoDealerName 车商名称
         * saleAgentProfCertifNo 业务员职业资格证号码
         * agentSalerName 代理跟单销售人员名称
         * agentSalerProfCertifNo 代理跟单销售人员职业证号码
         *
         * systemId 系统ID
         * entityCode 合作网点编码
         * systemId 系统ID
         * systemId 系统ID
         */

        // 稳定数据
        yun.param = {};

        // 临时数据
        yun.temp = {};

        // 数据初始化
        yun.param.userCode = yun.param.employeeCode = session_service.getAccount();
        yun.temp.userCode = yun.temp.employeeCode = session_service.getAccount();
        //        yun.param.userCode = yun.param.employeeCode = "2192500022";
        yun.temp.systemId = yun.param.systemId = 'systemId';
        if (window.appType == 'pro') {
            yun.param.callBackUrl = 'https://domain/index.html#/main/renewal/renewal_car_insur';
        } else if (window.appType == 'test') {
            yun.param.callBackUrl = 'https://domain/index.html#/main/renewal/renewal_car_insur';
        } else {
            yun.param.callBackUrl = 'https://domain/index.html#/main/renewal/renewal_car_insur';
        }

        /**
         * 参数列表
         * @Param
         */

        yun.attrList = [];

        // 读取器
        yun.getter = function (attr) {
            return this.temp[attr];
        };

        // 设置器
        yun.setter = function (attr, value) {
            this.temp[attr] = value;
            return this;
        };

        // 设置多个参数
        /**
         * @Param data 数据源
         * @Param attr1 
         * @Param attr2
         */
        yun.setmore = function () {
            // 未完成
        };

        // 初始化数据
        /**
         * 初始化操作只允许在临时数据中进行
         */
        yun.init = function (yunInfo) {
            angular.extend(this.temp, yunInfo || {});
            return this;
        };

        // 保存到稳定数据中
        /**
         * 业务逻辑:
         * [1] 将合法的数据保存在稳定数据中
         * [2] 保存后将临时数据清除
         */
        yun.save = function () {
            angular.extend(this.param, this.temp);
            this.temp = {};
            return this;
        };

        // 将稳定数据传给临时数据
        yun.toTemp = function () {
            angular.extend(this.temp, this.param);
            return this.temp;
        };

        // 合法性校验
        function check() {};

        // 与服务器对接
        /**
         * 对接成功后视情况可将临时数据保存在稳定数据中
         */

        // 获取业务员信息
        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         */
        yun._getSalesman = function getSalesman(callBack, otherData) {
            var data = {
                employeeCode: this.temp.userCode
            };
            !!otherData && angular.extend(data, otherData);

            http_service.get('salesman', {
                data: data,
                success: function (data) {

                    var attr1 = ["pcisDeptCode", "pcisDeptName", "departmentCode", "employeeCode", "employeeName", "employeeChannel"],
                        attr2 = ["pcisDeptCode", "pcisDeptName", "pcisDeptCode", "salerCode", "salerName", "empChannel"];

                    convert_service.convert(yun.temp, data, attr1, attr2);

                    typeof (callBack) == 'function' && callBack(data);
                }
            });
        };

        // 获取车商 / 合作网点
        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         */
        yun._getDot = function (callBack, otherData) {
            var data = {
                employeeCode: this.temp.employeeCode,
                systemId: this.temp.systemId,
                businessSourceDetailCode: this.temp.businessSourceDetailCode
            };
            !!otherData && angular.extend(data, otherData);

            http_service.get('dot_list', {
                data: data,
                success: function (data) {
                    typeof (callBack) == 'function' && callBack(data);
                }
            })
        };

        // 获取代理人信息
        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         * 注：entityCode 可能是 车商编码 或 合作网点编码， 默认 车商编码
         */
        yun._getAgentInfor = function (callBack, otherData) {
            var data = {
                entityCode: this.temp.autoDealerCode,
                systemId: this.temp.systemId,
                businessSourceDetailCode: this.temp.businessSourceDetailCode
            };
            !!otherData && angular.extend(data, otherData);

            http_service.get('agent_list', {
                data: data,
                success: function (data) {
                    typeof (callBack) == 'function' && callBack(data);
                }
            });
        };

        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         */
        yun._getmechanism = function (callBack, otherData) {
            var data = {
                departmentCode: this.temp.departmentCode,
                systemId: this.temp.systemId,
                businessSourceDetailCode: this.temp.businessSourceDetailCode
            };
            !!otherData && angular.extend(data, otherData);

            http_service.get('mechanism_list', {
                data: data,
                success: function (data) {
                    typeof (callBack) == 'function' && callBack(data);
                }
            });
        };

        // 获取代理协议
        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         */
        yun._getAgencyAgreement = function getAgencyAgreement(callBack, otherData) {
            var data = {
                agentCode: this.temp.agentCode,
                departmentCode: this.temp.pcisDeptCode,
                systemId: this.temp.systemId
            };
            !!otherData && angular.extend(data, otherData);

            http_service.get('agreement_list', {
                data: data,
                success: function (data) {
                    typeof (callBack) == 'function' && callBack(data);
                }
            });
        };

        /**
         * @Param callBack 回调函数
         * @Param otherData 其他数据
         *
         * 传入参数:
         * opt：用户编码、出单机构代码、出单机构名称、机构编码、业务员编码、业务员姓名、业务员渠道、渠道来源编码、渠道来源名称、渠道来源细分编码
         * 渠道来源细分名称、业务来源编码、业务来源名称、业务来源细分编码、业务来源细分名称、经纪人编码、经纪人名称、代理人代码、代理人名称
         * 代理人协议编号、代理人协议名称、合作网点代码、合作网点名称、车商编码、车商名称
         */
        yun.submit = function (callBack, otherData) {
            var data = {};
            angular.extend(data, this.temp);
            !!otherData && angular.extend(data, otherData);

            http_service.post('submitInfor', {
                data: data,
                success: function (data) {
                    typeof (callBack) == 'function' && callBack(data);
                }
            });
        };

        return yun;
    });
});