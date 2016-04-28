var $ = require('jquery');
var Popup = require('../components/pop_up');
var Validate = require('../components/validate.js');
var Paging = require('../components/paging.js');
var BackTop = require('../components/back_top.js');


$(function() {
    $("#register").on('click', function() {

        var popReg = new Popup('#popup_register');
        popReg.alert();

        var validate = new Validate({
            element: "#from_register",
            tips: ".err_msg"
        })
    })

    $("#login").on('click', function() {

        var popLogin = new Popup("#popup_login");
        popLogin.alert();

        var validate = new Validate({
            element: "#from_login",
            tips: ".err_msg"
        })
    })
    //分页
    var paging = new Paging(12,7);

    //返回顶部
    var backTop = new BackTop();

})
