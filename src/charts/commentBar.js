var $ = require('jquery');
var echarts = require('echarts');

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
        this.chart = echarts.init(this.el);
        this.name = this.cfg.name;
        if (this.el.getAttribute('data-fetch-url')) {
            this.url = this.el.getAttribute('data-fetch-url');
        }
        optionBasic = {
            grid: {
                left: 65,
                top: 27,
                right: '10%',
                bottom: 0,
                show: false,
            },
            yAxis: {
                type: 'category',
                data: ['豆瓣评分', '起点评分', '纵横评分', '17k评分'],
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                    onZero: true,
                },
                axisLabel: {
                    textStyle: {
                        color: '#979797',
                        fontSize: 14
                    }
                }
            },
            xAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                }
            },
            series: [{
                name: '',
                type: 'bar',
                data: [],
                barWidth: 16,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        textStyle: {
                            color: '#979797',
                            fontSize: 14
                        }
                    }
                }
            }],
            color: ['#84D2CD'],
            animation: false,
            textStyle: {
                fontFamily: 'pingfang SC'
            }
        }
        this.chart.setOption(optionBasic);
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
                    option = {
                        series: [{
                            name: result.name,
                            data: result.data,
                        }],
                    }
                    self.chart.setOption(option);
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
}


module.exports = Chart;
