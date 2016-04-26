var $ = require('jquery');
var echarts = require('echarts');

exports.chart = function() {
    var chartComprehensiveValue = echarts.init(document.getElementById('chart_comprehensive_value'));
    option = {
        tooltip: {
            trigger: 'item',
            position: 'top',
            formatter: '{c}',
            backgroundColor: '#00A69D',
            padding: [0, 12],
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#EFEFEF',
                }
            },
            axisLabel: {
                show: false,
            },
            splitLine: {
                interval: 1, //间隔x坐标轴线
                lineStyle: {
                    color: '#EFEFEF',
                }
            },
            axisTick: {
                show: false,
            },
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#EFEFEF',
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#EFEFEF',
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '综合指数',
            type: 'line',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: '#00A69D',
                    width: 2,
                },
            },
            areaStyle: {
                normal: {
                    color: '#00A69D',
                    opacity: 0.2
                }
            },
            data: []
        }],
        color: ['#00A69D']
    }
    chartComprehensiveValue.setOption(option);
    chartComprehensiveValue.showLoading();


    $.ajax({
        url: 'http://localhost:3000/jsonp',
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(result) {
            chartComprehensiveValue.hideLoading();
            chartComprehensiveValue.setOption({
                series: [{
                    data: result
                }]
            })
        },
        error: function(msg) {
            alert(msg.toSource());
        }
    });
}
