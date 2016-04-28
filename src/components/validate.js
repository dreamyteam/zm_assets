var $ = require('jquery');

var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;

function Validate(cfg) {
    this.cfg = {
        element: $(cfg.element),
        tips: $(cfg.tips)
    }
    this.init()
}
Validate.prototype.init = function() {
	var self = this;

    this.cfg.tips.hide();

    this.cfg.element.find('input').blur(function() {
        // 验证手机号
        if ($(this).is("input[name='phone_number']")) {
            if ($(this).val() == "" || null) {
                self.cfg.tips.show().html("请填写手机号码")
            } else if (!regPhone.test($(this).val())) {
                self.cfg.tips.show().html("手机号码格式错误")
            } else {
                this.cfg.tips.hide()
            }
        }
        //验证密码
        if ($(this).is("input[name='password']")) {
            if ($(this).val() == "" || null) {
                self.cfg.tips.show().html("请输入密码")
            }
        }
        // 验证验证码
        if ($(this).is("input[name='verify_code']")) {
            if ($(this).val() == "" || null) {
                self.cfg.tips.show().html("请输入验证码")
            }
        }

    })
}

module.exports = Validate;
