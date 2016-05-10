function SignForm(cfg) {
    this.cfg = cfg;
    this.el = null; //验证的根元素
    this.type = null; //  reg || login
    this.reg = null; //注册根元素
    this.login = null; // 登录根元素
    this.goLoninBtn = null; //去登录按钮
    this.goRegBtn = null; //去注册按钮

    /*    this.domValidate = null; //验证码dom
        this.formatPhone = false; //手机号验证状态
        this.formatPassword = false; //密码验证状态
        this.formatVerifyCode = false; //验证码状态
        this.activeValidateCode = true;
        this.count = null; //计数器
        this.type = null; //是否为注册页面 是为true
        this.domValidateContainer = null; //验证码container
        this.btnSubmit = null; //提交按钮*/
    this.init();
}

SignForm.prototype = {
    init: function() {
        this.el = $(this.cfg.el);
        // this.errMsg = this.el.find(this.cfg.errMsg);
        this.type = this.cfg.type;

        this.reg = this.el.find('#register_form');
        this.login = this.el.find('#login_form');
        this.goLoninBtn = this.login.find('.tips_bottom_btn');
        console.log(this.goLoninBtn.html());
        this.goRegBtn = this.reg.find('.tips_bottom_btn');
        console.log(this.goRegBtn.html());

        this.reg.hide(); //初始化都隐藏
        this.login.hide();

        this.checkType();
        this.bindUI();
    },
    checkType: function() {
        if (this.type == 'reg') {
            this.reg.show();
            this.login.hide();
        } else if (this.type == 'login') {
            this.login.show();
            this.reg.hide();
        }
    },
    bindUI: function() {
        var self = this;
        self.goLoninBtn.on('click', function() {
        	console.log('aaaaa');
        	self.login.show();
        	// self.reg.hide();
        })
        self.goRegBtn.on('click', function() {
            // self.login.hide();
        	self.reg.show();
        })
    }
}

module.exports = SignForm;
