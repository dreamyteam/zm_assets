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

	'use strict';

	var _get_value_history = __webpack_require__(4);

	var _get_value_history2 = _interopRequireDefault(_get_value_history);

	var _fix_top = __webpack_require__(5);

	var _fix_top2 = _interopRequireDefault(_fix_top);

	var _pop_up = __webpack_require__(1);

	var _pop_up2 = _interopRequireDefault(_pop_up);

	var _line = __webpack_require__(6);

	var _line2 = _interopRequireDefault(_line);

	var _radar = __webpack_require__(8);

	var _radar2 = _interopRequireDefault(_radar);

	var _pieMutiple = __webpack_require__(9);

	var _pieMutiple2 = _interopRequireDefault(_pieMutiple);

	var _pieDouble = __webpack_require__(10);

	var _pieDouble2 = _interopRequireDefault(_pieDouble);

	var _barVertical = __webpack_require__(11);

	var _barVertical2 = _interopRequireDefault(_barVertical);

	var _barComment = __webpack_require__(12);

	var _barComment2 = _interopRequireDefault(_barComment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Tab = __webpack_require__(13);
	var VoteProto = __webpack_require__(14); //投票


	$(function () {
	    //列表切换
	    new Tab({ selector: '.program_tab' });
	    //导航置顶
	    new _fix_top2.default();
	    //找到ip名字id
	    var ip_name = $('.program_info .content h1.name').html();
	    var ip_Id = $('#getIpid').val();
	    //异步趋势历史最高
	    var compositeValues = new _get_value_history2.default($('#composite_values'), 5);
	    var hotValues = new _get_value_history2.default($('#hot_values'), 1);
	    var developValues = new _get_value_history2.default($('#develop_values'), 2);
	    var propagateValues = new _get_value_history2.default($('#propagate_values'), 3);
	    var reputationValues = new _get_value_history2.default($('#reputation_values'), 4);

	    var voteproto = new VoteProto({
	        el: '.vote_container .vote_content',
	        ip_Id: ip_Id
	    });
	    //图表们
	    //综合指数
	    var comprehensiveValue = new _line2.default({
	        el: 'chart_comprehensive_value',
	        name: ip_name
	    });
	    //潜力模型
	    var potentialModel = new _radar2.default({
	        el: 'chart_potential_model',
	        name: ip_name
	    });
	    //热度趋势
	    var heatTrend = new _line2.default({
	        el: 'chart_heat_trend',
	        name: ip_name
	    });
	    //传播能力趋势
	    var transmissionIndex = new _line2.default({
	        el: 'chart_transmission_index',
	        name: ip_name
	    });
	    //新闻媒体平台
	    var mediaPlatform = new _pieMutiple2.default({
	        el: 'chart_media_platform',
	        left: 'center',
	        name: ip_name
	    });
	    // 社交平台
	    var socialPlatform = new _pieDouble2.default({
	        el: 'chart_social_platform',
	        type: 'social',
	        left: 'center',
	        name: ip_name
	    });
	    // 用户活跃度趋势
	    var userVitalty = new _line2.default({
	        el: 'chart_user_vitalty',
	        name: ip_name
	    });
	    // 性别比例分布
	    var sexDistribution = new _pieDouble2.default({
	        el: 'chart_sex_distribution',
	        type: 'sex',
	        left: 'center',
	        name: ip_name
	    });
	    //年龄分布
	    var ageDistribution = new _barVertical2.default({
	        el: 'chart_age_distribution',
	        type: 'age',
	        left: 'center',
	        name: ip_name
	    });
	    //点评图表
	    var commentReviews = new _barComment2.default({
	        el: 'chart_reviews',
	        name: ip_name
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Popup = function () {
	    function Popup(el) {
	        _classCallCheck(this, Popup);

	        this.el = $(el);
	        this.mask = null;
	        this.init();
	    }

	    _createClass(Popup, [{
	        key: 'init',
	        value: function init() {
	            if ($('#popup_mask').length > 0) {
	                this.mask = $('#popup_mask');
	            } else {
	                this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	            }
	            this.bindClose();
	        }
	    }, {
	        key: 'bindClose',
	        value: function bindClose() {
	            var self = this;
	            this.mask.on('click', function () {
	                self.destory();
	            });
	            if (this.el.find('button.close')) {
	                var btnClose = this.el.find('button.close');
	                btnClose.on('click', function () {
	                    self.destory();
	                });
	            }
	        }
	    }, {
	        key: 'destory',
	        value: function destory() {
	            this.mask.remove();
	            this.el.hide();
	        }
	    }, {
	        key: 'alert',
	        value: function alert() {
	            this.mask.appendTo("body");
	            this.el.show();
	            this.el.addClass("active");
	        }
	    }]);

	    return Popup;
	}();

	exports.default = Popup;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GetHistory = function () {
	    function GetHistory(el, type) {
	        _classCallCheck(this, GetHistory);

	        this.el = el;
	        this.type = type;
	        this.trendEL = null; //趋势箭头
	        this.historyDateEL = null; //历史最高日期元素
	        this.historyValueEL = null; //历史最高日期值元素
	        this.bookId = null;
	        this.url = null;
	        this.init();
	    }

	    _createClass(GetHistory, [{
	        key: 'init',
	        value: function init() {
	            this.trendEL = this.el.find(".arrow");
	            this.historyDateEL = this.el.find('.highest_history_date');
	            this.historyValueEL = this.el.find('.highest_histroy_value');
	            this.bookId = $('#bookId').val();
	            this.el.length > 0 && this.getRemoteData();
	        }
	    }, {
	        key: 'getRemoteData',
	        value: function getRemoteData() {
	            var self = this;
	            this.url = '/index/historyTrend?bookId=' + this.bookId + '&type=' + this.type + '&t=' + new Date().getTime();
	            $.ajax({
	                url: this.url,
	                type: 'GET',
	                dataType: 'jsonp',
	                jsonp: 'callback',
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        self.renderUI(result.data);
	                    }
	                    //TODO 处理error_code
	                }
	            });
	        }
	    }, {
	        key: 'renderUI',
	        value: function renderUI(data) {
	            //处理箭头
	            switch (data.current_index_trend) {
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
	            this.historyDateEL.html(data.history_top_date.replace(/-/g, '/'));
	            //处理数值
	            this.historyValueEL.html(data.history_top_value);
	        }
	    }]);

	    return GetHistory;
	}();

	exports.default = GetHistory;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FixTop = function () {
	    function FixTop(el) {
	        _classCallCheck(this, FixTop);

	        this.el = el || $('#program_nav');
	        this.init();
	    }

	    _createClass(FixTop, [{
	        key: 'init',
	        value: function init() {
	            var _this = this;

	            var self = this;
	            if (this.el.length > 0) {
	                (function () {
	                    var oriOffset = _this.el.offset().top;
	                    $(window).on('scroll', function () {
	                        if ($(this).scrollTop() > oriOffset) {
	                            self.el.addClass('program_nav_scroll');
	                        } else {
	                            self.el.removeClass('program_nav_scroll');
	                        }
	                    });
	                })();
	            }
	        }
	    }]);

	    return FixTop;
	}();

	exports.default = FixTop;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Line = function (_Chart) {
	    _inherits(Line, _Chart);

	    function Line() {
	        _classCallCheck(this, Line);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Line).apply(this, arguments));
	    }

	    _createClass(Line, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
	            if (this.type == "more") {
	                var datazom = [{
	                    type: 'inside',
	                    start: 70,
	                    end: 100
	                }, {
	                    start: 70,
	                    end: 100
	                }];
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
	                            color: '#EFEFEF'
	                        }
	                    },
	                    axisLabel: {
	                        show: false
	                    },
	                    splitLine: {
	                        interval: 2, //间隔x坐标轴线
	                        lineStyle: {
	                            color: '#EFEFEF'
	                        }
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    boundaryGap: false,
	                    data: []
	                }],
	                yAxis: [{
	                    type: 'value',
	                    axisLine: {
	                        lineStyle: {
	                            color: '#EFEFEF'
	                        }
	                    },
	                    splitLine: {
	                        lineStyle: {
	                            color: '#EFEFEF'
	                        }
	                    },
	                    axisTick: {
	                        show: false
	                    }
	                }],
	                series: [{
	                    name: this.name,
	                    type: 'line',
	                    symbolSize: 6,
	                    lineStyle: {
	                        normal: {
	                            color: '#00A69D',
	                            width: 2
	                        }
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
	            };
	            this.chart.setOption(optionBasic);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            var option = {
	                xAxis: [{
	                    data: data.date
	                }],
	                series: [{
	                    data: data.data
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }]);

	    return Line;
	}(_baseChart2.default);

	exports.default = Line;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Chart = function () {
	    function Chart(cfg) {
	        _classCallCheck(this, Chart);

	        this.cfg = cfg;
	        this.el = null; //表格元素
	        this.title = null; //标题
	        this.subTitle = null;
	        this.type = null; //种类 不同图表不同规则
	        this.name = null;
	        this.left = null; //title 是否居中
	        this.chart = null; //chart 实体
	        this.url = null; //ajax地址
	        this.init();
	    }

	    _createClass(Chart, [{
	        key: 'init',
	        value: function init() {
	            this.el = document.getElementById(this.cfg.el);
	            this.type = this.cfg.type || '';
	            this.left = this.cfg.left || '';
	            this.name = this.cfg.name;

	            if (this.el && this.el.hasAttribute('data-fetch-url')) {
	                this.url = this.el.getAttribute('data-fetch-url') + '&t=' + new Date().getTime();
	                if (this.type) {
	                    this.checkType(this.type);
	                } else {
	                    this.renderChart();
	                }
	            }
	        }
	    }, {
	        key: 'checkeType',
	        value: function checkeType(type) {}
	    }, {
	        key: 'renderChart',
	        value: function renderChart() {}
	    }, {
	        key: 'getRemoteData',
	        value: function getRemoteData() {
	            var self = this;
	            self.chart.showLoading();
	            $.ajax({
	                url: self.url,
	                type: 'GET',
	                dataType: 'jsonp',
	                jsonp: 'callback',
	                success: function success(result) {
	                    self.checkResult(result);
	                }
	            });
	        }
	    }, {
	        key: 'checkResult',
	        value: function checkResult(result) {
	            if (result.error_code == 0) {
	                this.updateChart(result.data);
	            } else {
	                this.showError(result.error_msg);
	            }
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {}
	    }, {
	        key: 'showError',
	        value: function showError(errMsg) {}
	    }]);

	    return Chart;
	}();

	exports.default = Chart;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Radar = function (_Chart) {
	    _inherits(Radar, _Chart);

	    function Radar() {
	        _classCallCheck(this, Radar);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Radar).apply(this, arguments));
	    }

	    _createClass(Radar, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
	            var option = {
	                tooltip: {
	                    show: true
	                },
	                radar: {
	                    nameGap: 10,
	                    name: {
	                        textStyle: {
	                            color: '#000',
	                            fontSize: 14
	                        }
	                    },
	                    indicator: [{ name: '热度', max: 60000 }, { name: '开发空间', max: 60000 }, { name: '传播', max: 60000 }, { name: '口碑', max: 60000 }, { name: '消费能力', max: 60000 }],
	                    splitArea: {
	                        areaStyle: {
	                            color: ['rgba(250,250,250,0)']
	                        }
	                    },
	                    splitLine: {
	                        lineStyle: {
	                            color: '#d8d8d8'
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
	            };
	            this.chart.setOption(option);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            var option = {
	                series: [{
	                    data: [{
	                        value: data.value,
	                        name: this.name
	                    }]
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }]);

	    return Radar;
	}(_baseChart2.default);

	exports.default = Radar;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pieMutiple = function (_Chart) {
	    _inherits(pieMutiple, _Chart);

	    function pieMutiple() {
	        _classCallCheck(this, pieMutiple);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(pieMutiple).apply(this, arguments));
	    }

	    _createClass(pieMutiple, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
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
	                    trigger: 'item'
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
	                                fontSize: 16
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
	            };
	            this.chart.setOption(optionBasic);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            var option = {
	                series: [{
	                    data: data
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }]);

	    return pieMutiple;
	}(_baseChart2.default);

	exports.default = pieMutiple;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pieDouble = function (_Chart) {
	    _inherits(pieDouble, _Chart);

	    function pieDouble() {
	        _classCallCheck(this, pieDouble);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(pieDouble).apply(this, arguments));
	    }

	    _createClass(pieDouble, [{
	        key: 'checkType',
	        value: function checkType(type) {
	            if (type == 'sex') {
	                this.title = '受众性别分布';
	            } else if (type == 'social') {
	                this.title = '社交媒体平台传播构成';
	            }
	            this.renderChart();
	        }
	    }, {
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
	            var optionBasic = {
	                title: {
	                    text: this.title,
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
	                    formatter: '{a}<br/>{b} : {d}%'
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
	                            position: 'center'
	                        },
	                        emphasis: {
	                            show: true,
	                            textStyle: {
	                                fontSize: 24
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
	            };
	            this.chart.setOption(optionBasic);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            if (this.type == 'sex') {
	                this.subTitle = this.caculateSubTitle(data[0].value, data[1].value);
	            }
	            var option = {
	                title: {
	                    subtext: this.subTitle
	                },
	                legend: {
	                    data: [{ name: data[0].name, icon: 'rect' }, { name: data[1].name, icon: 'rect' }]
	                },
	                series: [{
	                    data: [{ value: data[0].value, name: data[0].name, itemStyle: { emphasis: { color: '#EEEEEE' } } }, { value: data[1].value, name: data[1].name, itemStyle: { emphasis: { color: '#84d2cd' } } }]
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }, {
	        key: 'caculateSubTitle',
	        value: function caculateSubTitle(male, female) {
	            var total = male + female;
	            var malePer = male / total * 100;
	            if (malePer > 65) {
	                return '主要受众人群为男性';
	            } else if (malePer > 55 && malePer <= 65) {
	                return '受众用户偏向男性';
	            } else if (malePer > 45 && malePer <= 55) {
	                return '受众用户性别均衡';
	            } else if (malePer > 35 && malePer <= 45) {
	                return '受众用户偏向女性';
	            } else {
	                return '主要受众人群为女性';
	            }
	        }
	    }]);

	    return pieDouble;
	}(_baseChart2.default);

	exports.default = pieDouble;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var barVertical = function (_Chart) {
	    _inherits(barVertical, _Chart);

	    function barVertical() {
	        _classCallCheck(this, barVertical);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(barVertical).apply(this, arguments));
	    }

	    _createClass(barVertical, [{
	        key: 'checkType',
	        value: function checkType(type) {
	            if (type == 'age') {
	                this.title = '受众年龄分布';
	            } else if (type == '') {
	                this.title = '';
	            }
	            this.renderChart();
	        }
	    }, {
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
	            var optionBasic = {
	                title: {
	                    text: this.title,
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
	                    formatter: function formatter(params) {
	                        var average = params[0];
	                        var curIp = params[1];
	                        return average.seriesName + ' : ' + Math.floor(average.value * 100) + '%<br/>' + curIp.seriesName + ' : ' + Math.floor(curIp.value * 100) + '%';
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
	                    show: false
	                },
	                yAxis: {
	                    type: 'value',
	                    axisLabel: {
	                        show: false
	                    },
	                    splitLine: {
	                        show: false
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    axisLine: {
	                        show: false,
	                        onZero: true
	                    }
	                },
	                xAxis: {
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            color: '#d8d8d8',
	                            width: 1
	                        }
	                    },
	                    splitLine: {
	                        show: false
	                    },
	                    axisTick: {
	                        show: false
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
	            };
	            this.chart.setOption(optionBasic);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            if (this.type == 'age') {
	                this.subTitle = this.caculateSubTitle(data[1].value);
	            }
	            var option = {
	                title: {
	                    subtext: this.subTitle
	                },
	                legend: {
	                    data: ['平均分布', this.name]
	                },
	                series: [{
	                    name: '平均分布',
	                    type: 'bar',
	                    data: data[0].value,
	                    itemStyle: {
	                        emphasis: {
	                            color: '#EEE'
	                        }
	                    }
	                }, {
	                    name: this.name,
	                    type: 'bar',
	                    barGap: '-50%',
	                    z: 3,
	                    data: data[1].value
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }, {
	        key: 'caculateSubTitle',
	        value: function caculateSubTitle(ageArr) {
	            var maxAge = Math.max.apply(null, ageArr);
	            var titleArr = ['19岁以下', '20-29', '30-39', '40-49', '49以上'];
	            for (var i = 0; i < ageArr.length; i++) {
	                if (ageArr[i] == maxAge) {
	                    var subscript = i;
	                }
	            }
	            return '主要受众年龄段为[' + titleArr[subscript] + ']';
	        }
	    }]);

	    return barVertical;
	}(_baseChart2.default);

	exports.default = barVertical;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseChart = __webpack_require__(7);

	var _baseChart2 = _interopRequireDefault(_baseChart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var barCommit = function (_Chart) {
	    _inherits(barCommit, _Chart);

	    function barCommit() {
	        _classCallCheck(this, barCommit);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(barCommit).apply(this, arguments));
	    }

	    _createClass(barCommit, [{
	        key: 'renderChart',
	        value: function renderChart() {
	            this.chart = echarts.init(this.el);
	            var optionBasic = {
	                grid: {
	                    left: 65,
	                    top: 27,
	                    right: '10%',
	                    bottom: 0,
	                    show: false
	                },
	                yAxis: {
	                    type: 'category',
	                    data: [],
	                    splitLine: {
	                        show: false
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    axisLine: {
	                        show: false,
	                        onZero: true
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
	                        show: false
	                    },
	                    splitLine: {
	                        show: false
	                    },
	                    axisTick: {
	                        show: false
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
	            };
	            this.chart.setOption(optionBasic);
	            this.url && this.getRemoteData();
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(data) {
	            this.chart.hideLoading();
	            var option = {
	                yAxis: {
	                    data: [data[0].name, data[1].name, data[2].name, data[3].name]
	                },
	                series: [{
	                    data: [data[0].value, data[1].value, data[2].value, data[3].value]
	                }]
	            };
	            this.chart.setOption(option);
	        }
	    }]);

	    return barCommit;
	}(_baseChart2.default);

	exports.default = barCommit;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	function Tab(config) {
	    this.config = config || {};
	    this.selector = $(this.config.selector) || $('.program_tab');

	    this.tabTags = this.selector.find(this.config.tabTags || '.tab_tags');
	    this.tabContents = this.selector.find(this.config.tabContents || '.tab_contents');

	    this.init();
	}

	Tab.prototype.init = function () {

	    var tabTagsList = this.tabTags.find('li');
	    var contentList = this.tabContents.find('li');

	    tabTagsList.each(function () {
	        $(this).on('click', function () {
	            var index = $(this).index();
	            //除去标题的active类
	            tabTagsList.each(function () {
	                $(this).removeClass('active');
	            });
	            $(this).addClass('active');
	            //处理底部容器
	            contentList.each(function () {
	                $(this).removeClass('show');
	            });
	            contentList.eq(index).addClass('show');
	        });
	    });
	};

	module.exports = Tab;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	function VoteProto(cfg) {
	    this.cfg = cfg;
	    this.el = null; //根元素
	    this.ip_Id = null; //ipid
	    this.allBtns = null; //所有投票按钮
	    this.btnExpexts = null; // 期待投票按钮们
	    this.btnWanted = null; // 想开发按钮们
	    this.init();
	}
	VoteProto.prototype = {
	    init: function init() {
	        this.el = $(this.cfg.el);
	        this.ip_Id = this.cfg.ip_Id;
	        if (this.el) {
	            this.allBtns = this.el.find("button");
	            this.btnExpexts = this.el.find("button.expext");
	            this.btnWanted = this.el.find("button.wantDevelop");
	            this.renderVoted();
	            this.bindVoteBtns();
	        }
	    },
	    renderVoted: function renderVoted() {
	        //初始化已投票按钮
	        var self = this;
	        var expectVoted, wantVoted;
	        $.ajax({
	            url: '/ip/vote/detail',
	            type: 'POST',
	            data: {
	                ipId: self.ip_Id
	            },
	            success: function success(result) {
	                if (result.error_code == 0) {
	                    expectVoted = result.data["1"];
	                    wantVoted = result.data["2"];
	                    self.setVotedBtns(expectVoted, wantVoted);
	                } else if (result.error_code > 0) {
	                    //TODO 综合用户提示
	                    alert(result.error_msg);
	                }
	            }
	        });
	    },
	    setVotedBtns: function setVotedBtns(expect, want) {
	        for (var i = 0; i < expect.length; i++) {
	            var eindex = expect[i] - 1;
	            this.btnExpexts.eq(eindex).addClass('active').attr("disabled", true);
	        };

	        for (var j = 0; j < want.length; j++) {
	            var windex = want[j] - 1;
	            this.btnWanted.eq(windex).addClass('active').attr("disabled", true);
	        }
	    },
	    bindVoteBtns: function bindVoteBtns() {
	        var self = this;
	        this.allBtns.each(function () {
	            $(this).on("click", function () {
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
	                        ipId: self.ip_Id,
	                        type: type,
	                        choice: choice
	                    },
	                    success: function success(result) {
	                        console.log(result);
	                        if (result.error_code == 0) {
	                            //添加active
	                        } else if (result.error_code > 0) {
	                                alert(result.error_msg);
	                            }
	                    }
	                });
	            });
	        });
	    }
	};

	module.exports = VoteProto;

/***/ }
/******/ ]);