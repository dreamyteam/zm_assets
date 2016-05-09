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

	
	var PopupSign = __webpack_require__(1);
	var Validate = __webpack_require__(2);
	var Paging = __webpack_require__(13);
	var BackTop = __webpack_require__(5);


	$(function() {
	    $("#register").on('click', function() {

	        var popReg = new PopupSign('#popup_register');
	        popReg.alert();

	        var validate = new Validate({
	            el: "#from_register",
	            tips: ".err_msg",
	            type: "reg",
	            hasValidateCode:true
	        })
	    })

	    $("#login").on('click', function() {

	        var popLogin = new PopupSign("#popup_login");
	        popLogin.alert();

	        var validate = new Validate({
	            el: "#from_login",
	            tips: ".err_msg"
	        })
	    })
	    //分页
	    var paging = new Paging('#paging');

	    //返回顶部
	    var backTop = new BackTop();
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	function Popup(element) {
	    this.element = $(element);
	    this.mask = null;
	    this.init();
	}
	Popup.prototype = {
	    init: function() {
	        this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	        this.close();
	    },
	    alert: function() {
	        this.mask.appendTo("body");
	        this.element.show();
	    },
	    destory: function() {
	        this.mask.remove();
	        this.element.hide();
	    },
	    close: function() {
	        var self = this;
	        if (this.element.find('button.close')) {
	            var btnClose = this.element.find('button.close');
	            btnClose.on('click', function() {
	                self.destory();
	            })
	        }
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
	    this.type = null;
	    this.domValidateContainer = null;
	    this.btnSubmit = null;
	    this.tips_bottom = null;
	    this.btn_bottom = null;
	    this.init();
	}
	Validate.prototype = {
	    init: function() {
	        var self = this;
	        this.el = $(this.cfg.el);
	        this.tips = this.el.find(this.cfg.tips);
	        this.type = this.cfg.type; // true 为 reg false 为 login
	        this.domValidateContainer = this.el.find('div.verify');
	        this.domValidate = this.domValidateContainer.find(".btn_send_verify_code");
	        this.tips_bottom = this.el.find('.tips_bottom');
	        this.btn_bottom = this.el.find('.tips_bottom_btn');
	        this.btnSubmit = this.el.find('.btn_submit');
	        //清空数据
	        this.el.find('input').each(function() {
	            $(this).val('');
	        });
	        this.btn_bottom.on('click', function(e) {
	            self.type = !self.type;
	            self.checkType();
	            return false;
	        })
	        this.checkType();
	        this.tips.hide();
	        this.checkBasic();
	    },
	    checkType: function() {
	        var self = this;
	        if (this.type == true) {
	            this.domValidateContainer.show();
	            this.domValidate.html("发送验证码");
	            this.btnSubmit.html("创建帐号");
	            this.tips_bottom.html("已有帐号?点击");
	            this.btn_bottom.html("登录");
	            this.checkValidateCode();
	        } else if (this.type == false) {
	            this.domValidateContainer.hide();
	            this.btnSubmit.html("登录");
	            this.tips_bottom.html("没有帐号?点击");
	            this.btn_bottom.html("创建");
	        }
	        this.btnSubmit.on('click', function(e) {
	            e.preventDefault;
	            self.checkAjax();
	            return false;
	        })
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
	            //输入验证码
	            if ($(this).is("input[name='verify_code']")) {
	                if ($(this).val() == "" || null) {
	                    self.tips.show().html("请输入验证码")
	                }
	            }
	            if (self.type) {
	                self.checkValidateCode();
	            }
	        })
	    },
	    checkValidateCode: function() {
	        // 验证验证码
	        var self = this;
	        if (this.formatPhone && this.formatPassword) {
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
	    },
	    checkAjax: function() {
	        var self = this;
	        if (this.type) {
	            $.ajax({
	                url: '/user/register',
	                type: 'POST',
	                data: {
	                    mobile: self.el.find("input[name='phone_number']").val(),
	                    password: self.el.find("input[name='password']").val(),
	                    checkCode: self.el.find("input[name='verify_code']").val()
	                },
	                success: function(result) {
	                    console.log(result);
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.tips.show().html(result.error_msg);
	                    }
	                }
	            })
	        } else if (this.type == false) {
	            $.ajax({
	                url: '/user/login',
	                type: 'POST',
	                data: {
	                    mobile: self.el.find("input[name='phone_number']").val(),
	                    password: self.el.find("input[name='password']").val(),
	                },
	                success: function(result) {
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.tips.show().html(result.error_msg);
	                    }
	                }
	            })
	        }
	    },
	}

	module.exports = Validate;


/***/ },
/* 3 */,
/* 4 */,
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
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	


	function Paging(element) {
	    this.element = $(element);
	    this.url = window.location.pathname;
	    this.pageAttach = this.element.data("pageAttach");
	    this.init();
	}
	Paging.prototype.init = function() {
	    var totalNum = this.pageAttach.totalNum;
	    var current = this.pageAttach.currentPage;
	    var pageSize = this.pageAttach.pageSize;

	    var total = Math.ceil(totalNum/pageSize);

	    console.log(total);
	    var content = this.pageAttach.content;

	    if(pageSize <= totalNum){
	    	var ul = $('<ul></ul>');
		    this.element.append(ul);
		    //是否显示prev
		    if (current != 1) {
		        var prevBtn = $("<li><a href="+ this.url +'?content='+content+'&currentPage='+(current-1)+"><</a></li>");
		        prevBtn.appendTo(ul);
		    }

		    //插入中间页
		    if (total <= 7) {
		        for (var i = 1, len = total + 1; i < len; i++) {
		            if (i == current) {
		                ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		            } else {
		                ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		            }
		        }
		    } else {
		        if (current <= 4) {
		            for (var i = 1, len = 7; i <= len; i++) {
		                if (i == current) {
		                    ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		                } else {
		                    ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		                }
		            }
		        } else {
		            var pageStart = current - 3;
		            // console.log(pageStart);
		            var pageEnd = (current + 3) > total ? total : (current + 3);
		            // console.log(pageEnd);
		            for (var i = pageStart; i <= pageEnd; i++) {
		                if (i == current) {
		                    ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		                } else {
		                    ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
		                }
		            }
		        }
		    }

		    //是否显示next
		    if (current != total) {
		        var nextBtn = $("<li><a href="+ this.url +'?content='+content+'&currentPage='+(current+1)+">></a></li>");
		        nextBtn.appendTo(ul);
		    }
	    }

	   

	};

	module.exports = Paging;


/***/ }
/******/ ]);