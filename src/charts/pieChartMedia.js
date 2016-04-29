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
            title: {
                text: '在新闻媒体平台的传播构成',
                left: 'center',
                textStyle: {
                    color: '#4a4a4a',
                    fontSize: 16
                },
                subtextStyle: {
                    color: '#9b9b9b',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
            },
            series: [{
                name: '新闻媒体平台传播构成',
                type: 'pie',
                startAngle: 140,
                radius: ['40%', '65%'],
                center: ['50%', '55%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,   
                        textStyle: {
                            color: '#4a4a4a',
                            fontSize: 16,
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle:{
                    emphasis:{
                        color:'#00a69d',
                        opacity:0.8
                    }
                },
                data: [
                    // { value: 12, name: '凤凰' },
                    // { value: 32, name: '网易' },
                    // { value: 28, name: '虎嗅' },
                    // { value: 18, name: '腾讯' },
                    // { value: 9, name: '起点' }
                ]
            }],
            color: ['#00A69D', '#84D2CD', '#EEEEEE', '#84D2CD', '#EEEEEE'],
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
                    series: [{
                        data: result
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
