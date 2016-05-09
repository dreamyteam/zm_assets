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
