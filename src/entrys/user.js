var Popup = require('../components/pop_up_sign');
var cropper = require('../components/cropper.js');

$(function() {
    $('#avatar_mask').on('click', function() {
        var avatar = new Popup('#avatar_popup');
        avatar.alert();

        // $('#avatar_upload').on('change', function() {
        //     var val = $(this).val();
        //     var upLoadType = '.jpg,.gif,.bmp,.png'; //['.jpg','.gif','.bmp','.png']; //可上传的格式
        //     var fileExt = val.substr(val.lastIndexOf(".")).toLowerCase(); //从字符串中抽出最后一次出现.之后的字符，并且转换成小写
        //     var result = upLoadType.indexOf(fileExt); //查找后缀名是否符合条件，如果符合返回>=0，如果不符合则返回负数;
        //     _alertMsg = $('#error_text');
        //     var oFReader = new FileReader();
        //     if (this.files.length === 0) {
        //         return;
        //     }
        //     var oFile = this.files[0]; //如果只有一个文件则只需要访问这个FileList对象中的第一个元素.

        //     if (oFile.size / 1024 < 100) {
        //         _alertMsg.html("<font style='color:blue'>√</font>").show()
        //     };
        //     if (result < 0) {
        //         _alertMsg.html("请输入正确格式:" + upLoadType).show();
        //     } else {
        //         _alertMsg.html("<font style='color:blue'>√</font>").show();
        //     };

        //     oFReader.readAsDataURL(oFile); // 开始在后台进行读取操作。当图像文件的所有内容加载后,他们转换成一个data:URL,传递到onload回调函数中
        //     oFReader.onload = function(oFREvent) { //当读取操作成功完成时调用.
        //         document.getElementById("uploadPreview").src = oFREvent.target.result;
        //     };

        //     $('#uploadPreview').cropper({
        //         aspectRatio: 1 / 1,
        //         crop: function(e) {
        //             console.log(e.x);
        //         }
        //     });
        // })

        var $avatar = $("#avatar_upload");
        $avatar.cropper({
            aspectRatio: 1 / 1,
            preview: '.avatar_preview',
            crop: function(e) {}
        })

        var $inputImage = $("#avatar_input_upload");
        var URL = window.URL || window.webkitURL;
        var blobURL;

        if (URL) {
            $inputImage.change(function() {
                var files = this.files;
                var file;

                if (!$avatar.data('cropper')) {
                    return;
                }

                if (files && files.length) {
                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        blobURL = URL.createObjectURL(file);
                        $avatar.one('built.cropper', function() {

                            // Revoke when load complete
                            URL.revokeObjectURL(blobURL);
                        }).cropper('reset').cropper('replace', blobURL);
                        $inputImage.val('');
                    } else {
                        window.alert('Please choose an image file.');
                    }
                }
            });
        } else {
            $inputImage.prop('disabled', true).parent().addClass('disabled');
        }


    })



})
