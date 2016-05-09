var $ = require('jquery');
var PopupSign = require('../components/pop_up_sign.js');
var Validate = require('../components/validate.js');


$(function(){
	$("#register").on('click', function() {

        var popReg = new PopupSign('#popup_register');
        popReg.alert();

        var validate = new Validate({
            element: "#from_register",
            tips: ".err_msg"
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
})