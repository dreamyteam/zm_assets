var $ = require('jquery');
var echarts = require('echarts');
var PopupSign = require('../components/pop_up_sign.js');
var PopUpVote = require('../components/pop_up_vote.js');
var Validate = require('../components/validate.js');
var Tab = require('../components/tab.js');
var FixTop = require('../components/fix_top.js');
var BackTop = require('../components/back_top.js');
var LineChart = require('../charts/line.js');
var RadaChart = require('../charts/radar.js');
var PieChartMedia = require('../charts/pieChartMedia.js');
var PieChartDouble = require('../charts/pieChartDouble.js');
var VerticalBar = require('../charts/verticalBar.js');
var CommentReviews = require('../charts/commentBar.js');


$(function() {
    $("#register").on('click', function() {

        var popReg = new PopupSign('#popup_register');
        popReg.alert();

        var validate = new Validate({
            element: "#from_register",
            tips: ".err_msg"
        })
    })

    $("#login").on('click', function() {

            var popLogin = new PopupSign("#popup_login");
            popLogin.alert();

            var validate = new Validate({
                element: "#from_login",
                tips: ".err_msg"
            })
        })
        //列表切换
    new Tab({ selector: '.program_tab' });
    //导航置顶
    new FixTop();
    //返回顶部
    var back_top = new BackTop();

    //找到ip名字
    var ip_name = $('.program_info .content h1.name').html();

    //图表们
    //综合指数
    if ($('chart_comprehensive_value')) {
        var comprehensiveValue = new LineChart('chart_comprehensive_value', 'http://localhost:3000/jsonp');
    }

    //潜力模型
    var potentialModel = new RadaChart('chart_potential_model', 'http://localhost:3000/jsonpp');
    //热度趋势
    var heatTrend = new LineChart('chart_heat_trend', 'http://localhost:3000/jsonp');
    //传播能力趋势
    var transmissionIndex = new LineChart('chart_transmission_index', 'http://localhost:3000/jsonp');
    //新闻媒体平台
    var mediaPlatform = new PieChartMedia('chart_media_platform', 'http://localhost:3000/jsonppp');
    //社交平台
    var socialPlatform = new PieChartDouble({
        el: 'chart_social_platform',
        type: 'social',
        left: 'center',
        name: ip_name,
        url: 'http://localhost:3000/social',
    });
    //用户活跃度趋势
    var userVitalty = new LineChart('chart_user_vitalty', 'http://localhost:3000/jsonp');
    //性别比例分布
    var sexDistribution = new PieChartDouble({
        el: 'chart_sex_distribution',
        type: 'sex',
        left: 'center',
        name: ip_name,
        url: 'http://localhost:3000/sex'
    });
    //年龄分布
    var ageDistribution = new VerticalBar({
        el: 'chart_age_distribution',
        type: 'age',
        left: 'center',
        name: ip_name,
        url: 'http://localhost:3000/age'
    });
    //点评图表
    var commentReviews = new CommentReviews('chart_reviews', 'http://localhost:3000/comment');


    //期待开发投票
    if ($('.vote_container .vote_content')) {
        var btns = $('.vote_container .vote_content').find('button');
        var btnExpexts = $('.vote_container .vote_content').find('button.expext');
        var btnWantDevelop = $('.vote_container .vote_content').find('button.wantDevelop');
        var canClick = true;
        console.log(btns);
        btns.each(function() {
            $(this).on('click', function() {
                if (canClick) {
                    var parent = $(this).closest('.vote');
                    var projectName = parent.find('h5').html();
                    if ($(this).hasClass('expext')) {
                        var popupVote = new PopUpVote({
                            type: 'expext',
                            ipName: ip_name,
                            project: projectName
                        });
                    } else if ($(this).hasClass('wantDevelop')) {
                        var popupVote = new PopUpVote({
                            type: 'wantDevelop',
                            ipName: ip_name,
                            project: projectName
                        });
                    }
                    popupVote.alert();
                    canClick = false;
                    $('button.close').on('click', function() {
                        popupVote.destory();
                        canClick = true;
                    })
                }
            })
        })
    }
})
