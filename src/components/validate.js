

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
