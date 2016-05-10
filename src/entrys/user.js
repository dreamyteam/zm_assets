var Popup = require('../components/pop_up_sign');
var cropper = require('../components/cropper.js');

$(function() {
    $('#avatar_mask').on('click', function() {
        var avatar = new Popup('#avatar_popup');
        avatar.alert();

        $('#avatar_upload').on('change', function() {
            var val = $(this).val();
            console.log(val);
        })

        $('#avatar_select').cropper({
            aspectRatio: 1 / 1,
            crop: function(e) {}
        });


    })



})
