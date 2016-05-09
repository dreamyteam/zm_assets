
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
        this.chart = echarts.init(this.el);
        this.name = this.cfg.name;
        this.left = this.cfg.left || 'center';
        if(this.el.getAttribute('data-fetch-url')){
            this.url = this.el.getAttribute('data-fetch-url') + '&t='+new Date().getTime();
        }
        var optionBasic = {
            title: {
                text: '在新闻媒体平台的传播构成',
                left: this.left,
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
                name: this.name,
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
                itemStyle: {
                    emphasis: {
                        color: '#00a69d',
                        opacity: 0.8
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
                if (result.error_code == 0) {
                    self.chart.hideLoading();
                    var option = {
                        series: [{
                            data: result.data
                        }]
                    }
                    self.chart.setOption(option);
                } else {
                    return false;
                }
            },
            error: function(msg) {
                console.log(msg);
            }
        })
    }
}
module.exports = Chart;
