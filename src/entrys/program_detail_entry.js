var $ = require('jquery');
var echarts = require('echarts');
var Tab = require('../components/tab.js');
var FixTop = require('../components/fix_top.js');
var BackTop = require('../components/back_top.js');
var LineChart = require('../charts/line.js');
var RadaChart = require('../charts/radar.js');
var PieChartMedia = require('../charts/pieChartMedia.js');

$(function() {
    //列表切换
    new Tab({ selector: '#program_tab' });
    //导航置顶
    new FixTop();
    //返回顶部
    var back_top = new BackTop();
    //综合指数
    var comprehensiveValue = new LineChart('chart_comprehensive_value','http://localhost:3000/jsonp');
    //潜力模型
    var potentialModel = new RadaChart('chart_potential_model','http://localhost:3000/jsonpp');
    //热度趋势
    var heatTrend = new LineChart('chart_heat_trend','http://localhost:3000/jsonp');
    //传播能力趋势
    var transmissionIndex = new LineChart('chart_transmission_index','http://localhost:3000/jsonp');
    //新闻媒体平台
    var mediaPlatform = new PieChartMedia('chart_media_platform');

})
