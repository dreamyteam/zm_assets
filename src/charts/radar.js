var $ = require('jquery');
var echarts = require('echarts');

function Chart(element, url) {
    this.element = document.getElementById(element);
    this.chart = null;
    this.option = null;
    if (url) {
        this.url = url;
    }
    this.init();
}
Chart.prototype = {
    init: function() {
        this.chart = echarts.init(this.element);
        var option = {
            tooltip: {
                show: true,
            },
            radar: {
                nameGap: 10,
                name: {
                    textStyle: {
                        color: '#000',
                        fontFamily: 'Pingfang SC',
                        fontSize: 14,
                    },
                },
                indicator: [
                    { name: '热度', max: 60000 },
                    { name: '开发空间', max: 60000 },
                    { name: '传播', max: 60000 },
                    { name: '口碑', max: 60000 },
                    { name: '消费能力', max: 60000 },
                ],
                splitArea: {
                    areaStyle: {
                        color: ['rgba(250,250,250,0)'],
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#d8d8d8',
                    }
                }
            },
            series: [{
                name: '',
                type: 'radar',
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    normal: {
                        width: 3
                    }
                },
                areaStyle: {
                    normal: {
                        color: '#00A69D',
                        opacity: 0.2
                    }
                },
                data: [{
                    value: [],
                    name: ''
                }]
            }],
            color: ['#00A69D'],
            animation: false,
            textStyle: {
                fontFamily: 'pingfang SC'
            }
        }
        this.chart.setOption(option);
        if (this.url) {
            this.update();
        }
    },
    update: function() {
        this.chart.showLoading();
        var self = this;
        $.ajax({
            url: self.url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(result) {
                self.chart.hideLoading();
                var option = {
                    series: [{
                        name: result.name,
                        data: [{
                            value: result.value,
                            name: result.name
                        }]
                    }]
                }
                self.chart.setOption(option);
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
}
module.exports = Chart;
