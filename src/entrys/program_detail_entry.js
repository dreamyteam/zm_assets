var Popup = require('../components/pop_up.js');
// var PopUpVote = require('../components/pop_up_vote.js');  改为直接投票
var Tab = require('../components/tab.js');
var FixTop = require('../components/fix_top.js');
var BackTop = require('../components/back_top.js');
var LineChart = require('../charts/line.js');
var RadarChart = require('../charts/radar.js');
var PieChartMedia = require('../charts/pieChartMedia.js');
var PieChartDouble = require('../charts/pieChartDouble.js');
var VerticalBar = require('../charts/verticalBar.js');
var CommentReviews = require('../charts/commentBar.js');
var GetHistory = require('../components/get_value_history.js');
var VoteProto = require('../components/voteproto.js'); //投票

$(function() {
    //列表切换
    new Tab({ selector: '.program_tab' });
    //导航置顶
    new FixTop();
    //返回顶部
    var back_top = new BackTop();
    //找到ip名字
    var ip_name = $('.program_info .content h1.name').html();
    var ip_Id = $('#getIpid').val();
    //异步趋势历史最高
    var compositeValues = new GetHistory($('#composite_values'), 5);
    var hotValues = new GetHistory($('#hot_values'), 1);
    var developValues = new GetHistory($('#develop_values'), 2);
    var propagateValues = new GetHistory($('#propagate_values'), 3);
    var reputationValues = new GetHistory($('#reputation_values'), 4);

    var voteproto = new VoteProto({
        el:'.vote_container .vote_content',
        ip_Id:ip_Id
    })
    //图表们
    //综合指数
    var comprehensiveValue = new LineChart({
        el: 'chart_comprehensive_value',
        name: ip_name,
    });
    //潜力模型
    var potentialModel = new RadarChart({
        el: 'chart_potential_model',
        name: ip_name
    });
    //热度趋势
    var heatTrend = new LineChart({
        el: 'chart_heat_trend',
        name: ip_name
    });
    //传播能力趋势
    var transmissionIndex = new LineChart({
        el: 'chart_transmission_index',
        name: ip_name
    });
    //新闻媒体平台
    var mediaPlatform = new PieChartMedia({
            el: 'chart_media_platform',
            left: 'center',
            name: ip_name,
        })
        // 社交平台
    var socialPlatform = new PieChartDouble({
        el: 'chart_social_platform',
        type: 'social',
        left: 'center',
        name: ip_name,
    });
    // 用户活跃度趋势
    var userVitalty = new LineChart({
        el: 'chart_user_vitalty',
        name: ip_name
    });
    // 性别比例分布
    var sexDistribution = new PieChartDouble({
        el: 'chart_sex_distribution',
        type: 'sex',
        left: 'center',
        name: ip_name,
    });
    //年龄分布
    var ageDistribution = new VerticalBar({
        el: 'chart_age_distribution',
        type: 'age',
        left: 'center',
        name: ip_name,
    });
    //点评图表
    var commentReviews = new CommentReviews({
        el: 'chart_reviews',
        name: ip_name
    });
   
})
