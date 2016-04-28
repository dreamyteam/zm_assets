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
        var optionBasic = {
            tooltip: {
                trigger: 'axis',
                position: 'top',
                padding: 10,
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        width: 0.5,
                        color: '#00A69D'
                    }

                }
            },
            grid: {
                top: '5%',
                left: '0%',
                right: '2%',
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
                    interval: 2, //间隔x坐标轴线
                    lineStyle: {
                        color: '#EFEFEF',
                    }
                },
                axisTick: {
                    show: false,
                },
                boundaryGap: false,
                data: ['5月1日', '5月2日', '5月3日', '5月4日', '5月5日', '5月6日', '5月7日', '5月8日', '5月9日', '5月10日', '5/11', '5/12', '5/13', '5/14', '5/15', '5/16', '5/17', '5/18', '5/19', '5/20', '5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27', '5/28', '5/29', '5/30', '5/31']
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
                name: '',
                type: 'line',
                symbolSize: 6,
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
            color: ['#00A69D'],
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
                var option = {
                    xAxis: [{
                        data: result.date
                    }],
                    series: [{
                        name: result.name,
                        data: result.data
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



