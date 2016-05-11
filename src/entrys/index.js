var Popup = require('../components/pop_up_sign');
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
