// var echarts = require('echarts');
function Chart(cfg) {
    this.cfg = cfg;
    this.el = null;
    // this.titleText = null; // 标题 由type决定
    this.subTitle = null; //如果是sex图表 计算得出
    this.name = null; // ip名称 
    this.type = null; // 类型 more 普通
    this.left = null; //  标题是否剧中 'center' 'left'
    this.chart = null; // 图表实例
    this.url = null; //ajax 请求地址
    this.init();
}
Chart.prototype = {
    init: function() {
        this.el = document.getElementById(this.cfg.el);
        this.type = this.cfg.type || null;
        this.name = this.cfg.name;

        if (this.el && this.el.hasAttribute('data-fetch-url')) {
            this.url = this.el.getAttribute('data-fetch-url') + '&t=' + new Date().getTime();
            this.renderChart();
        }
        console.log(this.url)
    },
    renderChart: function() {
        this.chart = echarts.init(this.el);
        if (this.type == "more") {
            var datazom = [{
                type: 'inside',
                start: 70,
                end: 100
            }, {
                start: 70,
                end: 100
            }]
            var bottom = '8%';
        } else {
            var datazom = [];
            var bottom = '0%';
        }
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
            dataZoom: datazom,
            grid: {
                top: '5%',
                left: '0%',
                right: '2%',
                bottom: bottom,
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
                data: []
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
                name: this.name,
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
        this.update();
    },
    update: function() {
        this.chart.showLoading();
        var self = this;
        console.log(self.url);
        $.ajax({
            url: self.url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(result) {
                if (result.error_code == 0) {
                    self.chart.hideLoading();
                    var option = {
                        xAxis: [{
                            data: result.data.date
                        }],
                        series: [{
                            data: result.data.data
                        }]
                    }
                    self.chart.setOption(option);
                }
            }
        })
    }
}

module.exports = Chart;
