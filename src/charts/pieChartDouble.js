var $ = require('jquery');
var echarts = require('echarts');

function Chart(cfg) {
    this.cfg = cfg;
    this.el = null;
    this.titleText = null; // 标题 由type决定
    this.subTitle = null; //如果是sex图表 计算得出
    this.name = null; // ip名称 
    this.type = null; // 类型 sex social
    this.left = null; //  标题是否剧中 'center' 'left'
    this.chart = null; // 图表实例
    this.url = null; //ajax 请求地址
    this.init();
}
Chart.prototype = {
    init: function() {
        this.el = document.getElementById(this.cfg.el);
        this.type = this.cfg.type;
        if (this.type == 'sex') {
            this.titleText = '受众性别分布';
        } else if (this.type == 'social') {
            this.titleText = '社交媒体平台传播构成';
        }
        this.name = this.cfg.name;
        this.left = this.cfg.left || 'center';
        if (this.el.getAttribute('data-fetch-url')) {
            this.url = this.el.getAttribute('data-fetch-url');
        }
        this.renderChart();
    },
    renderChart: function() {
        this.chart = echarts.init(this.el);
        optionBasic = {
            title: {
                text: this.titleText,
                left: this.left,
                subtext: '',
                textStyle: {
                    color: '#4a4a4a',
                    fontSize: 16
                },
                subtextStyle: {
                    color: '#9b9b9b',
                    fontSize: 14
                }
            },
            legend: {
                left: 'center',
                top: 50,
                data: []
            },
            tooltip: {
                trigger: 'item',
            },
            series: [{
                name: this.name,
                type: 'pie',
                startAngle: 240,
                minAngle: 50,
                radius: ['40%', '65%'],
                center: ['50%', '55%'],
                avoidLabelOverlap: true,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: 24,
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    /*  { value: 0, name: '微信', itemStyle: { emphasis: { color: '#84d2cd' } } },
                      { value: 0, name: '微博', itemStyle: { emphasis: { color: '#EEEEEE' } } }*/
                ]
            }],
            color: ['#EEEEEE', '#84D2CD', '#84D2CD', '#EEEEEE', '#84D2CD'],
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
    caculateSubTitle: function(male, female) {
        var total = male + female
        var malePer = (male / total) * 100;
        if (malePer > 65) {
            return '主要受众人群为男性'
        } else if (malePer > 55 && malePer <= 65) {
            return '受众用户偏向男性'
        } else if (malePer > 45 && malePer <= 55) {
            return '受众用户性别均衡'
        } else if (malePer > 35 && malePer <= 45) {
            return '受众用户偏向女性'
        } else {
            return '主要受众人群为女性'
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
                    if (self.type == 'sex') {
                        self.subTitle = self.caculateSubTitle(result.data[0].value, result.data[1].value);
                    }
                    var option = {
                        title: {
                            subtext: self.subTitle,
                        },
                        legend: {
                            data: [
                                { name: result.data[0].name, icon: 'rect' },
                                { name: result.data[1].name, icon: 'rect' }
                            ]
                        },
                        series: [{
                            data: [
                                { value: result.data[0].value, name: result.data[0].name, itemStyle: { emphasis: { color: '#EEEEEE' } } },
                                { value: result.data[1].value, name: result.data[1].name, itemStyle: { emphasis: { color: '#84d2cd' } } }
                            ]
                        }]
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
