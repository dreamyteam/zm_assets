
var PopupSign = require('../components/pop_up_sign');
var Validate = require('../components/validate.js');
var Paging = require('../components/paging.js');
var BackTop = require('../components/back_top.js');


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
    //分页
    var paging = new Paging('#paging');

    //返回顶部
    var backTop = new BackTop();
})
