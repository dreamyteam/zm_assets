/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	// var echarts = require('echarts');
	var PopupSign = __webpack_require__(1);
	// var PopUpVote = require('../components/pop_up_vote.js');  改为直接投票
	var Validate = __webpack_require__(2);
	var Tab = __webpack_require__(3);
	var FixTop = __webpack_require__(4);
	var BackTop = __webpack_require__(5);
	var LineChart = __webpack_require__(6);
	var RadarChart = __webpack_require__(7);
	var PieChartMedia = __webpack_require__(8);
	var PieChartDouble = __webpack_require__(9);
	var VerticalBar = __webpack_require__(10);
	var CommentReviews = __webpack_require__(11);
	var GetHistory = __webpack_require__(12);


	$(function() {
	    $("#register").on('click', function() {

	        var popReg = new PopupSign('#popup_register');
	        popReg.alert();

	        var validate = new Validate({
	            element: "#from_register",
	            tips: ".err_msg",
	            hasValidateCode:true
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
	    //异步趋势历史最高 
	    var compositeValues = new GetHistory($('#composite_values'),5);
	    var hotValues = new GetHistory($('#hot_values'),1);
	    var developValues = new GetHistory($('#develop_values'),2);
	    var propagateValues = new GetHistory($('#propagate_values'),3);
	    var reputationValues = new GetHistory($('#reputation_values'),4);

	    //图表们

	    //综合指数
	    if ($('chart_comprehensive_value')) {
	        var comprehensiveValue = new LineChart({
	            el:'chart_comprehensive_value',
	            name:ip_name,
	        });
	    }

	    //潜力模型
	    var potentialModel = new RadarChart({
	        el:'chart_potential_model',
	        name:ip_name
	    });
	    //热度趋势
	    var heatTrend = new LineChart({
	        el:'chart_heat_trend',
	        name:ip_name
	    });
	    //传播能力趋势
	    var transmissionIndex = new LineChart({
	        el:'chart_transmission_index',
	        name:ip_name
	    });
	    //新闻媒体平台
	    var mediaPlatform = new PieChartMedia({
	        el:'chart_media_platform',
	        left:'center',
	        name:ip_name,
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
	        el:'chart_user_vitalty',
	        name:ip_name
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
	        el:'chart_reviews',
	        name:ip_name
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	

	function Popup(element) {
		this.element = $(element);
		this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
		this.init();
	}
	Popup.prototype.init = function(){
		this.close();
	};
	Popup.prototype.alert = function(){
		this.mask.appendTo("body");
		this.element.show();
	};
	Popup.prototype.destory = function(){
		this.mask.remove();
		this.element.hide();
	};
	Popup.prototype.close = function(){
		var self = this;
		if(this.element.find('button.close')){
			var btnClose = this.element.find('button.close');
			btnClose.on('click',function(){
				self.destory();
			})
		}
	}

	module.exports = Popup;


/***/ },
/* 2 */
/***/ function(module, exports) {

	

	var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	var regPwdLen = /^\S{6,}$/;

	function Validate(cfg) {
	    this.cfg = cfg;
	    this.el = null;
	    this.tips = null;
	    this.hasValidateCode = null;
	    this.domValidate = null; //验证码dom
	    this.formatPhone = false; //手机号验证状态
	    this.formatPassword = false; //密码验证状态
	    this.activeValidateCode = true;
	    this.count = null; //计数器
	    this.init();
	}
	Validate.prototype = {
	    init: function() {
	        this.el = $(this.cfg.el);
	        this.tips = this.el.find(this.cfg.tips);
	        this.hasValidateCode = this.cfg.hasValidateCode;
	        //清空数据
	        this.el.find('input').each(function() {
	            $(this).val('');
	        });
	        this.domValidate = this.el.find(".btn_send_verify_code");
	        this.domValidate.html("发送验证码");

	        this.tips.hide();
	        this.checkBasic();
	    },
	    checkBasic: function() {
	        var self = this;
	        this.el.find('input').on("input propertychange", function() {
	            //验证手机号
	            if ($(this).is("input[name='phone_number']")) {
	                if ($(this).val() == "" || null) {
	                    self.tips.show().html("请填写手机号码")
	                } else if (!regPhone.test($(this).val())) {
	                    self.tips.show().html("手机号码格式错误")
	                } else {
	                    self.tips.hide();
	                    self.formatPhone = true;
	                }
	            }
	            //验证密码
	            if ($(this).is("input[name='password']")) {
	                if ($(this).val() == "" || null) {
	                    self.tips.show().html("请输入密码")
	                } else if (!regPwdLen.test($(this).val())) {
	                    self.tips.show().html("密码长度必须大于6位数")
	                } else {
	                    self.tips.hide();
	                    self.formatPassword = true;
	                }
	            }
	            // 验证验证码
	            if ($(this).is("input[name='verify_code']")) {
	                if ($(this).val() == "" || null) {
	                    self.tips.show().html("请输入验证码")
	                }
	            }
	            // 验证码状态
	            if (self.hasValidateCode) {
	                self.checkValidateCode()
	            }
	        })
	    },
	    checkValidateCode: function() {
	        var self = this;


	        if (this.formatPhone && this.formatPassword && this.activeValidateCode) {
	            this.domValidate.addClass('active');
	            this.domValidate.removeAttr("disabled");
	            this.domValidate.on('click', function(e) {
	                e.preventDefault(); //阻止提交按钮的默认行为
	                //发送验证码到手机
	                //倒计时功能
	                self.clickDomValidate();
	            })
	        }
	    },
	    clickDomValidate: function() {
	        var self = this;
	        self.activeValidateCode = false;
	        self.domValidate.removeClass('active');
	        var countdown = 60;
	        settime(self.domValidate);

	        function settime(obj) {
	            if (countdown == 0) {
	                obj.removeAttr("disabled");
	                obj.addClass("active");
	                obj.html("重新发送");
	                countdown = 60;
	                return;
	            } else {
	                obj.attr("disabled", "disabled")
	                obj.html("重新发送" + countdown + 's');
	                countdown--;
	            }
	            setTimeout(function() {
	                settime(obj)
	            }, 1000)
	        }


	    }


	}

	module.exports = Validate;


/***/ },
/* 3 */
/***/ function(module, exports) {

	

	function Tab(config) {
	    this.config = config || {};
	    this.selector = $(this.config.selector) || $('.program_tab');

	    this.tabTags = this.selector.find(this.config.tabTags || '.tab_tags');
	    this.tabContents = this.selector.find(this.config.tabContents || '.tab_contents');

	    this.init();
	}

	Tab.prototype.init = function() {

	    var tabTagsList = this.tabTags.find('li');
	    var contentList = this.tabContents.find('li');


	    tabTagsList.each(function() {
	        $(this).on('click', function() {
	            var index = $(this).index();
	            //除去标题的active类
	            tabTagsList.each(function() {
	                $(this).removeClass('active');
	            });
	            $(this).addClass('active');
	            //处理底部容器
	            contentList.each(function() {
	                $(this).removeClass('show');
	            });
	            contentList.eq(index).addClass('show');
	        })
	    })

	};

	module.exports = Tab;


/***/ },
/* 4 */
/***/ function(module, exports) {

	

	function FixTop(element) {
	    this.element = element || $('#program_nav');
	    this.init();
	}
	FixTop.prototype.init = function() {
	    var oriOffsetTop = $('#program_nav').offset().top;
	    $(window).on('scroll', function() {
	        if ($(this).scrollTop() > oriOffsetTop) {
	            $('#program_nav').addClass('program_nav_scroll');
	        } else {
	            $('#program_nav').removeClass('program_nav_scroll');
	        }
	    })
	}

	module.exports = FixTop

/***/ },
/* 5 */
/***/ function(module, exports) {

	

	// 设置位置元素
	function BackTop(contrastElement) {
	    this.boundingBox = null;
	    this.contrastElement = $(contrastElement || '.container');
	    this.init();
	}
	BackTop.prototype.renderUI = function() {
	    this.boundingBox = $(
	        "<div id='gotoTop'><button class='back_to_top'></button><a class='feedback' href='#'></a></div>"
	    )

	    this.boundingBox.appendTo(document.body);
	    // 先消失
	    this.boundingBox.hide();
	    this.show();
	}
	BackTop.prototype.show = function() {
	    var self = this;
	    $(window).scroll(function() {
	        var top = $(document).scrollTop();
	        if (top > 400) {
	            self.boundingBox.fadeIn(200);
	        } else if (top < 400) {
	            self.boundingBox.fadeOut(200);
	        }

	    });
	}
	BackTop.prototype.syncUI = function() {
	    var self = this;

	    var cLeft = this.contrastElement.offset().left;
	    var cWidth = this.contrastElement.width();

	    this.boundingBox.css({
	        left: cLeft + cWidth + 20 + 'px'
	    })

	    $(window).resize(function() {
	        var cLeft = self.contrastElement.offset().left;
	        var cWidth = self.contrastElement.width();

	        self.boundingBox.css({
	            left: cLeft + cWidth + 20 + 'px'
	        })
	    })
	}
	BackTop.prototype.toTop = function() {
	    var self = this;

	    this.boundingBox.find('button.back_to_top').on('click', function() {
	        $('html,body').animate({
	            scrollTop: 0
	        }, 500)
	    })
	}
	BackTop.prototype.init = function() {
	    this.renderUI();
	    this.syncUI();
	    this.toTop();
	}

	module.exports = BackTop;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
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
	        if (this.el.getAttribute('data-fetch-url')) {
	            this.url = this.el.getAttribute('data-fetch-url') + '&t='+new Date().getTime();
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
	            grid: {
	                top: '5%',
	                left: '0%',
	                right: '2%',
	                bottom: '0%',
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
	        if (this.url) { this.update(); }
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
	                console.log(result);
	                if (result.error_code == 0) {
	                    self.chart.hideLoading();
	                    var option = {
	                        xAxis: [{
	                            data: result.data.date
	                        }],
	                        series: [{
	                            name: self.name,
	                            data: result.data.data
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	
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
	        if (this.el.getAttribute('data-fetch-url')) {
	            var time = new Date()
	            this.url = this.el.getAttribute('data-fetch-url') + '&' + time;
	            console.log(this.url);
	        }
	        var option = {
	            tooltip: {
	                show: true,
	            },
	            radar: {
	                nameGap: 10,
	                name: {
	                    textStyle: {
	                        color: '#000',
	                        fontSize: 14,
	                    },
	                },
	                indicator: [
	                    { name: '热度', max: 60000 },
	                    { name: '开发空间', max: 60000 },
	                    { name: '传播', max: 60000 },
	                    { name: '口碑', max: 60000 },
	                    { name: '消费能力', max: 60000 },
	                ],
	                splitArea: {
	                    areaStyle: {
	                        color: ['rgba(250,250,250,0)'],
	                    }
	                },
	                splitLine: {
	                    lineStyle: {
	                        color: '#d8d8d8',
	                    }
	                }
	            },
	            series: [{
	                name: this.name,
	                type: 'radar',
	                symbol: 'circle',
	                symbolSize: 8,
	                lineStyle: {
	                    normal: {
	                        width: 3
	                    }
	                },
	                areaStyle: {
	                    normal: {
	                        color: '#00A69D',
	                        opacity: 0.2
	                    }
	                },
	                data: [{
	                    value: [],
	                    name: this.name
	                }]
	            }],
	            color: ['#00A69D'],
	            animation: false,
	            textStyle: {
	                fontFamily: 'pingfang SC'
	            }
	        }
	        this.chart.setOption(option);
	        if (this.url) {
	            this.update();
	        }
	    },
	    update: function() {
	        this.chart.showLoading();
	        var self = this;
	        var time = new Date();
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
	                            data: [{
	                                value: result.data.value,
	                            }]
	                        }]
	                    }
	                    self.chart.setOption(option);
	                }
	            }
	        })
	    }
	}
	module.exports = Chart;


/***/ },
/* 8 */
/***/ function(module, exports) {

	
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


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	// var echarts = require('echarts');

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
	            this.url = this.el.getAttribute('data-fetch-url') + '&t='+new Date().getTime();
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


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	// var echarts = require('echarts');

	function Chart(cfg) {
	    this.cfg = cfg;
	    this.el = null;
	    this.titleText = null; // 标题 由type决定
	    this.subTitle = null; //如果是sex图表 计算得出
	    this.name = null; // ip名称 
	    this.type = null; // 类型 'age' 'vote'
	    this.left = null; //  标题是否剧中 'center' 'left'
	    this.chart = null; // 图表实例
	    this.url = null; //ajax 请求地址
	    this.init();
	}
	Chart.prototype = {
	    init: function() {
	        this.el = document.getElementById(this.cfg.el);
	        this.type = this.cfg.type;
	        if (this.type == 'age') {
	            this.titleText = '受众年龄分布';
	        } else if (this.type == 'social') {
	            this.titleText = '投票结果';
	        }
	        this.name = this.cfg.name;
	        this.left = this.cfg.left || 'center';
	        if (this.el.getAttribute('data-fetch-url')) {
	            this.url = this.el.getAttribute('data-fetch-url') + '&t='+new Date().getTime();
	        }
	        this.renderChart();
	    },
	    renderChart: function() {
	        this.chart = echarts.init(this.el);
	        optionBasic = {
	            title: {
	                text: this.titleText,
	                subtext: '',
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
	                trigger: 'axis',
	                formatter:function(params){
	                    var average = params[0];
	                    var curIp = params[1];
	                    return average.seriesName + ' : ' + Math.floor(average.value*100) + '%<br/>'+curIp.seriesName + ' : ' +Math.floor(curIp.value*100)+ '%';
	                },
	                axisPointer: {
	                    type: 'shadow',
	                    shadowStyle: {
	                        opacity: 0.3
	                    }
	                }
	            },
	            legend: {
	                top: 50,
	                data: []
	            },
	            grid: {
	                top: 70,
	                show: false,
	            },
	            yAxis: {
	                type: 'value',
	                axisLabel: {
	                    show: false,
	                },
	                splitLine: {
	                    show: false,
	                },
	                axisTick: {
	                    show: false,
	                },
	                axisLine: {
	                    show: false,
	                    onZero: true,
	                },
	            },
	            xAxis: {
	                axisLine: {
	                    show: true,
	                    lineStyle: {
	                        color: '#d8d8d8',
	                        width: 1,
	                    }
	                },
	                splitLine: {
	                    show: false,
	                },
	                axisTick: {
	                    show: false,
	                },
	                type: 'category',
	                data: ['19岁以下', '20-29', '30-39', '40-49', '49以上']
	            },
	            series: [],
	            color: ['#EEEEEE', '#84D2CD'],
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
	    getSubText: function(resArr) {
	        var maxAge = Math.max.apply(null, resArr);
	        var titleArr = ['19岁以下', '20-29', '30-39', '40-49', '49以上'];
	        for (var i = 0; i < resArr.length; i++) {
	            if (resArr[i] == maxAge) {
	                var subscript = i;
	            }
	        }
	        return '主要受众年龄段为[' + titleArr[subscript] + ']'
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
	                // console.log(result);
	                if (result.error_code == 0) {
	                    self.chart.hideLoading();
	                    if (self.type == 'age') {
	                        self.subTitle = self.getSubText(result.data[1].value);
	                    }
	                    var option = {
	                        title: {
	                            subtext: self.subTitle,
	                        },
	                        legend: {
	                            data: [result.data[0].name, result.data[1].name]
	                        },
	                        series: [{
	                            name: result.data[0].name,
	                            type: 'bar',
	                            data: result.data[0].value,
	                            itemStyle: {
	                                emphasis: {
	                                    color: '#EEE'
	                                }
	                            }
	                        }, {
	                            name: result.data[1].name,
	                            type: 'bar',
	                            barGap: '-50%',
	                            z: 3,
	                            data: result.data[1].value
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


/***/ },
/* 11 */
/***/ function(module, exports) {

	
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
	        if (this.el.getAttribute('data-fetch-url')) {
	            this.url = this.el.getAttribute('data-fetch-url') + '&t='+new Date().getTime();
	        }
	        optionBasic = {
	            grid: {
	                left: 65,
	                top: 27,
	                right: '10%',
	                bottom: 0,
	                show: false,
	            },
	            yAxis: {
	                type: 'category',
	                data: ['豆瓣评分', '起点评分', '纵横评分', '17k评分'],
	                splitLine: {
	                    show: false,
	                },
	                axisTick: {
	                    show: false,
	                },
	                axisLine: {
	                    show: false,
	                    onZero: true,
	                },
	                axisLabel: {
	                    textStyle: {
	                        color: '#979797',
	                        fontSize: 14
	                    }
	                }
	            },
	            xAxis: {
	                type: 'value',
	                axisLine: {
	                    show: false,
	                },
	                splitLine: {
	                    show: false,
	                },
	                axisTick: {
	                    show: false,
	                }
	            },
	            series: [{
	                name: this.name,
	                type: 'bar',
	                data: [],
	                barWidth: 16,
	                label: {
	                    normal: {
	                        show: true,
	                        position: 'right',
	                        textStyle: {
	                            color: '#979797',
	                            fontSize: 14
	                        }
	                    }
	                }
	            }],
	            color: ['#84D2CD'],
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
	                    //tudo 自动遍历数组
	                    option = {
	                        yAxis: {
	                            data: [result.data[0].name, result.data[1].name, result.data[2].name, result.data[3].name]
	                        },
	                        series: [{
	                            data: [result.data[0].value, result.data[1].value, result.data[2].value, result.data[3].value],
	                        }],
	                    }
	                    self.chart.setOption(option);
	                }
	            }
	        })
	    }
	}


	module.exports = Chart;


/***/ },
/* 12 */
/***/ function(module, exports) {

	

	function GetHistory(el, type) {
	    this.el = el;
	    this.trendEL = null; //趋势箭头元素
	    this.historyDateEL = null; //历史最高日起元素
	    this.historyValueEL = null; //历史最高日起值元素
	    this.bookId = null; //取到bookid
	    this.type = type; //指数type
	    this.url = null; //ajax地址
	    this.result = null; //ajax 值
	    this.init();
	}
	GetHistory.prototype = {
	    init: function() {
	        this.trendEL = this.el.find(".arrow");
	        this.historyDateEL = this.el.find('.highest_history_date');
	        this.historyValueEL = this.el.find('.highest_histroy_value');
	        this.bookId = $('#bookId').val();
	        this.url = 'http://ipcool.me/index/historyTrend?bookId=' + this.bookId + '&type=' + this.type + '&t='+new Date().getTime();
	        if(this.el){this.getData();}
	    },
	    getData: function() {
	        var self = this;
	        $.ajax({
	            url: self.url,
	            type: 'GET',
	            dataType: 'jsonp',
	            jsonp: 'callback',
	            success: function(result) {
	            	// console.log(result);
	                if (result.error_code == 0) {
	                    self.result = result.data;
	                    self.renderUI();
	                }
	            }
	        })
	    },
	    renderUI: function() {
	        //处理箭头
	        switch (this.result.current_index_trend) {
	            case "0":
	                this.trendEL.html('-');
	                break;
	            case "1":
	                this.trendEL.html('↑');
	                break;
	            case "2":
	                this.trendEL.html('↓');
	                break;
	            default:
	                this.trendEL.html('-');
	                break;
	        }
	        //处理日期
	        this.historyDateEL.html(this.result.history_top_date);
	        //处理数值
	        this.historyValueEL.html(this.result.history_top_value);
	    }
	}

	module.exports = GetHistory;


/***/ }
/******/ ]);