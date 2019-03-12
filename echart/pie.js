var myChart = echarts.init(document.getElementById('main'));

var option = {
  // 提示窗
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  // 图示
  legend: {
//    orient: 'vertical',
    align: 'left',
//    x: 'left',
    y: 'bottom',
    data: ['基金', '股市', '储蓄', '临时钱包', '债务', '理财通', '余额宝', '工行基金', '上行基金', '招行基金', '东莞证券', '上海银行', '工商银行（韶）', '工商银行（ 深）', '邮政储蓄（ 湛）', '中国银行', '中信银行', '招商银行', '微信']
  },
  // 图表配置
  series: [{
    name: '财富分布', // 内圈
    type: 'pie',
    selectedMode: 'single',
    radius: [0, '30%'],
    label: {
      normal: {
        position: 'inner'
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 37782.44,
      name: '基金',
      selected: true
    }, {
      value: 6097.49,
      name: '股市'
    }, {
      value: 15546.89,
      name: '储蓄'
    }, {
      value: 28.23,
      name: '临时钱包'
    }, {
      value: 1500.00,
      name: '债务'
    }]
  }, { // 外圈
    name: '财富分布',
    type: 'pie',
    radius: ['40%', '55%'],
    data: [{
      value: 21531.51,
      name: '理财通'
    }, {
      value: 3218.16,
      name: '余额宝'
    }, {
      value: 6022.21,
      name: '工行基金'
    }, {
      value: 3003.64,
      name: '上行基金'
    }, {
      value: 4006.92,
      name: '招行基金'
    }, {
      value: 6097.49,
      name: '东莞证券'
    }, {
      value: 10967.31,
      name: '上海银行'
    }, {
      value: 143.66,
      name: '工商银行（韶）'
    }, {
      value: 705.88,
      name: '工商银行（深）'
    }, {
      value: 154.23,
      name: '邮政储蓄（湛）'
    }, {
      value: 1672.56,
      name: '中国银行'
    }, {
      value: 903.86,
      name: '中信银行'
    }, {
      value: 999.39,
      name: '招商银行'
    }, {
      value: 28.23,
      name: '微信'
    }, {
      value: 1500,
      name: '债务'
    }]
  }]
};

myChart.setOption(option);

