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
                self.chart.hideLoading();
                option = {
                    series: [{
                        name: result.name,
                        data: result.data,
                    }],
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
