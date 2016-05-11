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

	var Popup = __webpack_require__(1);
	var Paging = __webpack_require__(13);
	var BackTop = __webpack_require__(5);
	var SignIn = __webpack_require__(2);

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

	})





	/*$(function() {

	 $("#register").on('click', function() {
	        var popReg = new Popup('#popup_sign');
	        popReg.alert();
	        var validate = new Validate({
	            el: "#sign_form",
	            tips: ".err_msg",
	            type: true
	        })
	    })

	    $("#login").on('click', function() {
	        var popLogin = new Popup("#popup_sign");
	        popLogin.alert();
	        var validate = new Validate({
	            el: "#sign_form",
	            type: false,
	            tips: ".err_msg"
	        })
	    })
	    //分页
	    var paging = new Paging('#paging');

	    //返回顶部
	    var backTop = new BackTop();
	})*/


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
	        if ($('#popup_mask').length > 0) {
	            this.mask = $('#popup_mask');
	        } else {
	            this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	        }
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
	        this.mask.on('click', function() {
	            self.destory();
	        })
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

	function Sign(cfg) {
	    this.cfg = cfg;
	    this.type = null; //0 为reg 1为login
	    this.boxReg = $("#register_form");
	    this.boxLogin = $("#login_form");
	    this.el = $("#popup_sign");
	    this.err_msg = this.el.find('.err_msg');
	    this.boxValidate = $("#register_form .btn_send_verify_code");
	    this.canClickSendVCB = true; //可以发送验证码
	    this.init();
	}

	Sign.prototype = {
	    init: function() {
	        this.type = this.cfg.type;
	        this.boxReg.hide();
	        this.boxLogin.hide();
	        this.err_msg.hide();
	        this.checkType(this.type); //检测type
	        this.bindSwitchBtn();
	    },
	    bindSwitchBtn: function() {
	        var self = this;
	        this.boxReg.find('.tips_bottom_btn').on('click', function() {
	            self.type = 1;
	            self.checkType(self.type)
	        })
	        this.boxLogin.find('.tips_bottom_btn').on('click', function() {
	            self.type = 0;
	            self.checkType(self.type)
	        })
	    },
	    checkType: function(type) {
	        if (type == 0) { // reg
	            this.renderReg();
	        } else if (type == 1) { //login
	            this.renderLogin();
	        }
	    },
	    renderReg: function() {
	        this.boxLogin.hide();
	        this.boxReg.show();
	        this.validateBase(0);
	    },
	    renderLogin: function() {
	        this.boxReg.hide();
	        this.boxLogin.show();
	        this.validateBase(1);
	    },
	    validateBase: function(type) { // 0 跳入 reg判断 1 跳入 login 判断
	        var self = this;
	        var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	        var regPwdLen = /^\S{6,}$/;
	        var correctPhone = false;
	        var correctPwd = false;

	        if (type == 0) {
	            this.boxReg.find('input').bind("input propertychange", function() {
	                if ($(this).is("input[name='phone_number']")) {
	                    if ($(this).val() == "" || null) {
	                        self.err_msg.show().html("请填写手机号码")
	                        correctPhone = false;
	                    } else if (!regPhone.test($(this).val())) {
	                        self.err_msg.show().html("手机号码格式错误")
	                        correctPhone = false;
	                    } else {
	                        self.err_msg.hide();
	                        correctPhone = true;
	                    }
	                }
	                if ($(this).is("input[name='password']")) {
	                    if ($(this).val() == "" || null) {
	                        self.err_msg.show().html("请输入密码");
	                        correctPwd = false;
	                    } else if (!regPwdLen.test($(this).val())) {
	                        self.err_msg.show().html("密码长度必须大于6位数")
	                        correctPwd = false;
	                    } else {
	                        self.err_msg.hide();
	                        correctPwd = true;
	                    }
	                }
	                if (correctPhone && correctPwd) {
	                    self.bindBtnValidate();
	                }
	            })
	        } else if (type == 1) {
	            this.boxLogin.find('input').bind("input propertychange", function() {
	                if ($(this).is("input[name='phone_number']")) {
	                    if ($(this).val() == "" || null) {
	                        self.err_msg.show().html("请填写手机号码")
	                        correctPhone = false;
	                    } else if (!regPhone.test($(this).val())) {
	                        self.err_msg.show().html("手机号码格式错误")
	                        correctPhone = false;
	                    } else {
	                        self.err_msg.hide();
	                        correctPhone = true;
	                    }
	                }
	                if ($(this).is("input[name='password']")) {
	                    if ($(this).val() == "" || null) {
	                        self.err_msg.show().html("请输入密码");
	                        correctPwd = false;
	                    } else if (!regPwdLen.test($(this).val())) {
	                        self.err_msg.show().html("密码长度必须大于6位数")
	                        correctPwd = false;
	                    } else {
	                        self.err_msg.hide();
	                        correctPwd = true;
	                    }
	                }
	                if (correctPhone && correctPwd) {
	                    self.loginSubmit();
	                }
	            })
	        }
	    },
	    bindBtnValidate: function() {
	        var self = this;
	        console.log('can send validate code btn active' + this.canClickSendVCB);
	        if (this.canClickSendVCB) {
	            this.boxValidate.addClass('active');
	            this.boxValidate.removeAttr("disabled");
	        }
	        this.boxValidate.off('click');
	        this.boxValidate.on('click', function(e) {
	            self.checkValidate();
	            return false;
	        })
	    },
	    checkValidate: function() {
	        var self = this;
	        $.ajax({
	            url: '/user/register/verificationCode',
	            type: 'POST',
	            data: {
	                mobile: self.boxReg.find("input[name='phone_number']").val(),
	            },
	            success: function(result) {
	                console.log(result);
	                if (result.error_code == 0) {
	                    self.boxValidate.removeClass('active');
	                    self.boxValidate.attr("disabled", "disabled");
	                    self.canClickSendVCB = false;
	                    self.regSubmit();
	                    settime(self.boxValidate);
	                } else if (result.error_code > 0) {
	                    self.err_msg.show().html(result.error_msg);
	                }
	            }
	        });
	        var countdown = 60;

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
	    regSubmit: function() {
	        var self = this;
	        var btnSubmit = this.boxReg.find("button.solid");
	        btnSubmit.addClass('active');
	        btnSubmit.off('click');
	        btnSubmit.on('click', function() {
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
	                        self.err_msg.show().html(result.error_msg);
	                    }
	                }
	            })
	            return false;
	        })
	    },
	    loginSubmit: function() {
	        var self = this;
	        var btnSubmit = this.boxLogin.find("button.solid");
	        btnSubmit.addClass('active');
	        btnSubmit.on('click', function() {
	            $.ajax({
	                url: '/user/login',
	                type: 'POST',
	                data: {
	                    mobile: self.boxLogin.find("input[name='phone_number']").val(),
	                    password: self.boxLogin.find("input[name='password']").val(),
	                },
	                success: function(result) {
	                    console.log(result)
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.err_msg.show().html(result.error_msg);
	                    }
	                }
	            })
	            return false;
	        })
	    }
	}

	module.exports = Sign;


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
	    if ($('#gotoTop').length > 0) {
	        this.boundingBox = $('#gotoTop');
	    } else {
	        this.boundingBox = $(
	            "<div id='gotoTop'><button class='back_to_top'></button><a class='feedback' href='#'></a></div>"
	        )
	        this.boundingBox.appendTo(document.body);
	    }
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
	    if (this.element.length > 0) {
	        this.init();
	    }

	}
	Paging.prototype.init = function() {
	    var totalNum = this.pageAttach.totalNum;
	    var current = this.pageAttach.currentPage;
	    var pageSize = this.pageAttach.pageSize;
	    var total = Math.ceil(totalNum / pageSize);
	    var content = this.pageAttach.content;
	    if (pageSize <= totalNum) {
	        var ul = $('<ul></ul>');
	        this.element.append(ul);
	        //是否显示prev
	        if (current != 1) {
	            var prevBtn = $("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + (current - 1) + "><</a></li>");
	            prevBtn.appendTo(ul);
	        }

	        //插入中间页
	        if (total <= 7) {
	            for (var i = 1, len = total + 1; i < len; i++) {
	                if (i == current) {
	                    ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                } else {
	                    ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                }
	            }
	        } else {
	            if (current <= 4) {
	                for (var i = 1, len = 7; i <= len; i++) {
	                    if (i == current) {
	                        ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    } else {
	                        ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    }
	                }
	            } else {
	                var pageStart = current - 3;
	                // console.log(pageStart);
	                var pageEnd = (current + 3) > total ? total : (current + 3);
	                // console.log(pageEnd);
	                for (var i = pageStart; i <= pageEnd; i++) {
	                    if (i == current) {
	                        ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    } else {
	                        ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    }
	                }
	            }
	        }

	        //是否显示next
	        if (current != total) {
	            var nextBtn = $("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + (current + 1) + ">></a></li>");
	            nextBtn.appendTo(ul);
	        }
	    }
	};

	module.exports = Paging;


/***/ }
/******/ ]);