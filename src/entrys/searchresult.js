
var PopupSign = require('../components/pop_up_sign');
var Validate = require('../components/validate.js');
var Paging = require('../components/paging.js');
var BackTop = require('../components/back_top.js');


$(function() {
    $("#register").on('click', function() {

        var popReg = new PopupSign('#popup_register');
        popReg.alert();

        var validate = new Validate({
            el: "#from_register",
            tips: ".err_msg",
            hasValidateCode:true
        })
    })

    $("#login").on('click', function() {

        var popLogin = new PopupSign("#popup_login");
        popLogin.alert();

        var validate = new Validate({
            element: "#from_login",
            tips: ".err_msg"
        })
    })
    //分页
    var paging = new Paging('#paging');

    //返回顶部
    var backTop = new BackTop();
})
