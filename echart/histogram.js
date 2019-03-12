var myChart = echarts.init(document.getElementById('main'));

// x轴标签
var dataAxis = ['旗滨股份', '鑫科材料', '大东南'];

// 图表数据
var data = [32.15, 39.85, 57.64];

// 最大高度
var yMax = 60;

// 背景数据
var dataShadow = [];
for (var i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}

var option = {
  // 图标标题
  title: {
    text: '收益明细',
    subtext: 'profit detail'
  },
  // x轴配置
  xAxis: {
    data: dataAxis,
    axisLabel: {
      inside: true,
      textStyle: {
        color: '#fff'
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  // y轴配置
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#999'
      }
    }
  },
  dataZoom: [{
    type: 'inside'
  }],
  series: [
    { // 背景系列
      type: 'bar',
      itemStyle: {
        normal: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      barGap: '-100%',
      barCategoryGap: '40%',
      data: dataShadow,
      animation: false
    }, { // 数据系列
      type: 'bar',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#83bff6'
          }, {
            offset: 0.5,
            color: '#188df0'
          }, {
            offset: 1,
            color: '#188df0'
          }])
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#2378f7'
          }, {
            offset: 0.7,
            color: '#2378f7'
          }, {
            offset: 1,
            color: '#83bff6'
          }])
        }
      },
      data: data
    }]
};

// Enable data zoom when user click bar.
var zoomSize = 6;

// 自定义点击放大事件
myChart.on('click', function (params) {
  console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
  myChart.dispatchAction({
    type: 'dataZoom',
    startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
    endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
  });
});

myChart.setOption(option);