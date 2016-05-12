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
        var hasValueRegPhone = false,
            hasValueRegPwd = false,
            hasValueLoginPhone = false,
            hasValueLoginPwd = false;

        if (type == 0) { //reg
            this.boxReg.find('input').on("input propertychange", function() {
                if ($(this).is("input[name='phone_number']")) {
                    $(this).val($(this).val().replace(/\D/g, '')); //只能输入数字
                    if ($(this).val() !== '') {
                        hasValueRegPhone = true;
                    }
                }
                if ($(this).is("input[name='password']")) {
                    if ($(this).val() !== '') {
                        hasValueRegPwd = true;
                    }
                }
                if (hasValueRegPhone && hasValueRegPwd) {
                    self.bindBtnValidateReg();
                }
            })
        } else if (type == 1) { //login
            this.boxLogin.find('input').on("input propertychange", function() {
                if ($(this).is("input[name='phone_number']")) {
                    $(this).val($(this).val().replace(/\D/g, '')); //只能输入数字
                    if ($(this).val() !== '') {
                        hasValueLoginPhone = true;
                    }
                }
                if ($(this).is("input[name='password']")) {
                    if ($(this).val() !== '') {
                        hasValueLoginPwd = true;
                    }
                }
                if (hasValueLoginPhone && hasValueLoginPwd) {
                    self.loginSubmit();
                }
            })
        }
    },
    bindBtnValidateReg: function() {
        console.log('can click validate')
        var self = this;
        if (this.canClickSendVCB) {
            this.boxValidate.addClass('active');
            this.boxValidate.removeAttr("disabled");
        }
        this.boxValidate.off('click');
        this.boxValidate.on('click', function(e) {
            var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
            var regPwd = /^[a-zA-Z\d]{6,16}$/;
            var inputPhone = self.boxReg.find("input[name='phone_number']");
            var inputPwd = self.boxReg.find("input[name='password']");
            if (!regPhone.test(inputPhone.val())) {
                self.err_msg.show().html("手机号码格式错误")
            } else if (!regPwd.test(inputPwd.val())) {
                self.err_msg.show().html("密码必须为6-16位,字母或数字")
            } else {
                self.err_msg.hide();
                self.checkValidate();
            }
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
        var lastInput = this.boxReg.find("input[name='verify_code']");
        btnSubmit.addClass('active');
        lastInput.off("keydown");
        console.log(lastInput);
        lastInput.on("keydown", function(e) {
            var key = e.which;
            if (key == 13) {
                e.preventDefault();
                self.regConfirm();
                return false;
            }
        })
        btnSubmit.off('click');
        btnSubmit.on('click', function() {
            self.regConfirm();
            return false;
        })
    },
    regConfirm: function() {
        var self = this;
        $.ajax({
            url: '/user/register',
            type: 'POST',
            data: {
                mobile: self.boxReg.find("input[name='phone_number']").val(),
                password: self.boxReg.find("input[name='password']").val(),
                checkCode: self.boxReg.find("input[name='verify_code']").val()
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
    },
    loginSubmit: function() {
        var self = this;
        var btnSubmit = this.boxLogin.find("button.solid");
        var lastInput = this.boxLogin.find("input[name='password']");
        btnSubmit.addClass('active');

        lastInput.off("keydown");
        lastInput.on("keydown", function(e) {
            var key = e.which;
            if (key == 13) {
                e.preventDefault();
                self.loginBeforeAjax();
                return false;
            }
        })
        btnSubmit.off("click");
        btnSubmit.on('click', function(e) {
            e.preventDefault();
            self.loginBeforeAjax();
            return false;
        })
    },
    loginBeforeAjax: function() {
        var self = this;
        var inputPhone = self.boxLogin.find("input[name='phone_number']");
        var inputPwd = self.boxLogin.find("input[name='password']");
        if (!regPhone.test(inputPhone.val())) {
            self.err_msg.show().html("手机号码格式错误")
        } else if (!regPwd.test(inputPwd.val())) {
            self.err_msg.show().html("密码必须为6-16位,字母或数字")
        } else {
            self.err_msg.hide();
            self.loginConfirm();
        }
    },
    loginConfirm: function() {
        var self = this;
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
    }
}

module.exports = Sign;
