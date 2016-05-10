// var echarts = require('echarts');

function Chart(cfg) {
    this.cfg = cfg;
    this.el = null;
    // this.titleText = null; // 标题 由type决定
    this.subTitle = null; //如果是sex图表 计算得出
    this.name = null; // ip名称 
    // this.type = null; // 类型 sex social
    this.left = null; //  标题是否剧中 'center' 'left'
    this.chart = null; // 图表实例
    this.url = null; //ajax 请求地址
    this.init();
}
Chart.prototype = {
    init: function() {
        this.el = document.getElementById(this.cfg.el);
        this.name = this.cfg.name;

         if (this.el && this.el.hasAttribute('data-fetch-url')) {
            this.url = this.el.getAttribute('data-fetch-url') + '&t=' + new Date().getTime();
            this.renderChart();
        }
    },
    renderChart: function() {
        this.chart = echarts.init(this.el);
        var option = {
            tooltip: {
                show: true,
            },
            radar: {
                nameGap: 10,
                name: {
                    textStyle: {
                        color: '#000',
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
                name: this.name,
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
                    name: this.name
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
                if (result.error_code == 0) {
                    self.chart.hideLoading();
                    var option = {
                        series: [{
                            data: [{
                                value: result.data.value,
                            }]
                        }]
                    }
                    self.chart.setOption(option);
                }
            }
        })
    }
}
module.exports = Chart;
