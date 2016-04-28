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
                subtext: '平台的传播推动能力较大',
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
                formatter: "{c}"
            },
            series: [{
                name: '平台传播能力推动',
                type: 'pie',
                startAngle: 140,
                radius: ['40%', '65%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#4a4a4a',
                            fontFamily: 'pingfang SC',
                            fontSize: 16,
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 12, name: '凤凰' },
                    { value: 32, name: '网易' },
                    { value: 28, name: '虎嗅' },
                    { value: 18, name: '腾讯' },
                    { value: 9, name: '起点' }
                ]
            }],
            color: ['#00A69D', '#84D2CD', '#EEEEEE', '#84D2CD', '#EEEEEE']
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
                console.log(result.value);
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
