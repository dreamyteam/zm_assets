var Popup = require('../components/pop_up_sign.js');
// var PopUpVote = require('../components/pop_up_vote.js');  改为直接投票
var SignIn = require('../components/LonginReg.js');
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


$(function() {
    $("#register").on('click', function() {
        var popReg = new Popup('#popup_sign');
        popReg.alert();

        new SignIn({
            el: '#popup_sign',
            type: 0
        })
    })

    $("#login").on('click', function() {
            var popLogin = new Popup("#popup_sign");
            popLogin.alert();
            new SignIn({
                el: "#popup_sign",
                type: 1
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
    var ip_Id = $('#getIpid').val();
    //异步趋势历史最高
    var compositeValues = new GetHistory($('#composite_values'), 5);
    var hotValues = new GetHistory($('#hot_values'), 1);
    var developValues = new GetHistory($('#develop_values'), 2);
    var propagateValues = new GetHistory($('#propagate_values'), 3);
    var reputationValues = new GetHistory($('#reputation_values'), 4);


    if ($('.vote_container .vote_content')) {
        //初始化 已投票 
        var expectVoted, wantVoted;
        $.ajax({
            url: '/ip/vote/detail',
            type: 'POST',
            data: {
                ipId: ip_Id,
            },
            success: function(result) {
                if (result.error_code == 0) {
                    expectVoted = result.data["1"];
                    wantVoted = result.data["2"];
                    setVotedBtns(expectVoted, wantVoted);

                } else if (result.error_code > 0) {
                    alert(result.error_msg);
                }
            }
        })

        function setVotedBtns(expectVoted, wantVoted) {

            var btnExpexts = $('.vote_container .vote_content').find('button.expext');
            var btnWantDevelop = $('.vote_container .vote_content').find('button.wantDevelop');


            for (var i = 0; i < expectVoted.length; i++) {
                var eindex = expectVoted[i] - 1;
                btnExpexts.eq(eindex).addClass('active').attr("disabled", true);
            };

            for (var j = 0; j < wantVoted.length; j++) {
                var windex = wantVoted[j] - 1;
                btnWantDevelop.eq(windex).addClass('active').attr("disabled", true);
            }

        }
    }





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
    //期待开发投票
    if ($('.vote_container .vote_content')) {
        var btns = $('.vote_container .vote_content').find('button');
        var btnExpexts = $('.vote_container .vote_content').find('button.expext');
        var btnWantDevelop = $('.vote_container .vote_content').find('button.wantDevelop');
        var canClick = true;
        // console.log(btns);
        btns.each(function() {
            $(this).on('click', function() {
                if (canClick) {
                    $(this).addClass("active").attr("disabled", true);
                    var parent = $(this).closest('.vote');
                    var projectName = parent.find('h5').html();
                    var type = parent.data("type");
                    var choice;
                    if ($(this).hasClass('expext')) {
                        choice = 1;
                    } else if ($(this).hasClass('wantDevelop')) {
                        choice = 2;
                    }
                    $.ajax({
                            url: '/user/intention/vote',
                            type: 'POST',
                            data: {
                                ipId: ip_Id,
                                type: type,
                                choice: choice
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.error_code == 0) {
                                    //添加active
                                    $(this).addClass("active").attr("disabled", true);
                                } else if (result.error_code > 0) {
                                    alert(result.error_msg);
                                }
                            }
                        })
                        // canClick = false;
                }
            })
        })
    }
    //综合指数细节
    var comprehensiveValueDetain = new LineChart({
        el: 'chart_comprehensive_value_detail',
        name: ip_name,
        type: 'more',
    })

})
