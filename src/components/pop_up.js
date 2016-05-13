function Popup(element) {
    this.element = $(element);
    this.mask = null;
    this.init();
}
Popup.prototype = {
    init: function() {
        if ($('#popup_mask').length > 0) {
            this.mask = $('#popup_mask');
        } else {
            this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
        }
        this.close();
    },
    alert: function() {
        this.mask.appendTo("body");
        this.element.show();
        this.element.addClass("active");
    },
    destory: function() {
        this.mask.remove();
        this.element.hide();
    },
    close: function() {
        var self = this;
        this.mask.on('click', function() {
            self.destory();
        })
        if (this.element.find('button.close')) {
            var btnClose = this.element.find('button.close');
            btnClose.on('click', function() {
                self.destory();
            })
        }
    }
}
module.exports = Popup;
