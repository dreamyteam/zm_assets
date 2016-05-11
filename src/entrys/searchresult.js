var Popup = require('../components/pop_up_sign');
var Paging = require('../components/paging.js');
var BackTop = require('../components/back_top.js');
var SignIn = require('../components/LonginReg.js');

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
