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

	$(function() {
	    $("#register").on('click', function() {
	        var popReg = new PopupSign('#popup_sign');
	        popReg.alert();
	        var validate = new Validate({
	            el: "#sign_form",
	            tips: ".err_msg",
	            type: true
	        })
	    })

	    $("#login").on('click', function() {
	        var popLogin = new PopupSign("#popup_sign");
	        popLogin.alert();
	        var validate = new Validate({
	            el: "#sign_form",
	            type: false,
	            tips: ".err_msg"
	        })
	    })
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

	var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	var regPwdLen = /^\S{6,}$/;

	function Validate(cfg) {
	    this.cfg = cfg;
	    this.el = null;
	    this.tips = null; //错误提示容器
	    // this.hasValidateCode = null;
	    this.domValidate = null; //验证码dom
	    this.formatPhone = false; //手机号验证状态
	    this.formatPassword = false; //密码验证状态
	    this.formatVerifyCode = false; //验证码状态
	    this.activeValidateCode = true;
	    this.count = null; //计数器
	    this.type = null; //是否为注册页面 是为true
	    this.domValidateContainer = null; //验证码container
	    this.btnSubmit = null; //提交按钮
	    this.tips_bottom = null; //按钮下 文字
	    this.btn_bottom = null; //按钮下 切换按钮
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

	        this.btn_bottom.on('click', function(e) {
	            self.type = !self.type; //切换帐号
	            self.checkType();
	            self.setDefault();
	            return false;
	        })
	        this.checkType();
	        this.setDefault();
	        this.checkBasic();
	        this.bindSubmit();
	    },
	    setDefault: function() {
	        //清空数据
	        this.el.find('input').each(function() {
	            $(this).val('');
	        });
	        this.domValidate.removeClass('active');
	        this.domValidate.attr('disabled', true);
	        this.tips.hide();
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

	    },
	    bindSubmit: function() {
	        var self = this;
	        this.btnSubmit.on('click', function(e) {
	            e.preventDefault();
	            if (self.formatVerifyCode && self.formatPassword && self.formatPhone) {
	                self.btnSubmit.attr('disabled',false);
	                self.checkAjax();
	            }else {
	                self.btnSubmit.attr('disabled',true);
	            }
	            return false;
	        })
	    },
	    checkBasic: function() {
	        var self = this;
	        this.el.find('input').on("blur", function() {
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
	                $.ajax({
	                    url: '/user/register/verificationCode',
	                    type: 'POST',
	                    data: {
	                        mobile: self.el.find("input[name='phone_number']").val(),
	                    },
	                    success: function(result) {
	                        console.log(result);
	                        if (result.error_code == 0) {
	                            self.formatVerifyCode = true;
	                        } else if (result.error_code > 0) {
	                            self.tips.show().html(result.error_msg);
	                        }
	                    }
	                })
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
	                        self.ver
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


/***/ }
/******/ ]);