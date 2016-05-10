var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
var regPwdLen = /^\S{6,}$/;

function Validate(cfg) {
    this.cfg = cfg;
    this.el = null;
    this.tips = null; //错误提示容器
    this.domValidate = null; //验证码dom
    this.formatPhone = false; //手机号验证状态
    this.formatPassword = false; //密码验证状态
    this.formatVerifyCode = false; //验证码状态
    this.count = null; //计数器
    this.canSenverifyCode = true;
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
                self.btnSubmit.attr('disabled', false);
                self.checkAjax();
            } else {
                self.btnSubmit.attr('disabled', true);
            }
            return false;
        })
    },
    checkBasic: function() {
        var self = this;

        this.el.find("input[name='phone_number']").on("blur", function() {
            if ($(this).val() == "" || null) {
                self.tips.show().html("请填写手机号码")
            } else if (!regPhone.test($(this).val())) {
                self.tips.show().html("手机号码格式错误")
            } else {
                self.tips.hide();
                self.formatPhone = true;
            }
        })

        this.el.find("input[name='password']").on("blur", function() {
            if ($(this).val() == "" || null) {
                self.tips.show().html("请输入密码")
            } else if (!regPwdLen.test($(this).val())) {
                self.tips.show().html("密码长度必须大于6位数")
            } else {
                self.tips.hide();
                self.formatPassword = true;
                if(self.formatPhone && this.type){
                    self.checkValidateCode();
                }
            }
        })
    },
    checkValidateCode: function() {
        var self = this;
        self.domValidate.addClass('active');
        self.domValidate.removeAttr("disabled");
        // 验证验证码
        this.domValidate.on('click', function(event) {
            var event = event || window.event;
            event.preventDefault(); //阻止提交按钮的默认行为
            event.stopPropagation();
            if (self.formatVerifyCode == false) {
                console.log("checkAjax")
                self.clickDomValidate();
            }
            //倒计时功能
            return false;
        })
    },
    clickDomValidate: function() {
        var self = this;
        //发送验证码到手机
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
                    self.domValidate.removeClass('active');
                    settime(self.domValidate);
                } else if (result.error_code > 0) {
                    self.tips.show().html(result.error_msg);
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
                    if (result.error_code == 0) {} else if (result.error_code > 0) {
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
