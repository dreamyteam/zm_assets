var Popup = require('../components/pop_up_sign');
var cropper = require('../components/cropper.js');

$(function() {
    $('#avatar_mask').on('click', function() {
        var $inputImage = $("#avatar_input_upload");
        var URL = window.URL || window.webkitURL;
        var blobURL;
        if (URL) {
            $inputImage.change(function() {
                var files = this.files;
                var file;
                if (files && files.length) {
                    file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        // 弹框
                        var avatar_popup = new Popup('#avatar_popup');
                        avatar_popup.alert();
                        var $avatar = $("#avatar_upload");
                        $avatar.cropper({
                            aspectRatio: 1 / 1,
                            crop: function(e) {
                                console.log(e.x);
                                console.log(e.y);
                                console.log(e.width);
                                console.log(e.height);
                                console.log(e.scaleX);
                                console.log(e.scaleY);
                            }
                        })
                        $avatar.one('built.cropper', function() {
                            URL.revokeObjectURL(blobURL);
                        }).cropper('reset').cropper('replace', blobURL);

                        //发送ajax
                        $("#avatar_upload_submit").off("click");
                        $("#avatar_upload_submit").on("click", function() {
                            console.log("ajax");
                            

                        })


                    } else {
                        window.alert('请选择图片文件');
                    }
                }
            });
        }
    })
})
