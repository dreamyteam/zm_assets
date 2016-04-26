var $ = require('jquery');
var echarts = require('echarts');
var tab = require('../components/tab.js').tab;
var fixTop = require('../components/fix_top.js').fixTop;
var chartComprehensiveValue = require('../charts/comprehensivevalue.js').chart;

//列表切换
tab({selector:'#program_tab'});
//导航置顶
fixTop();
//综合价值图表

chartComprehensiveValue();
