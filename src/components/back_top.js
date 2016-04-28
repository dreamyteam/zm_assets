var $ = require('jquery');

// 设置位置元素
function BackTop(contrastElement) {
    this.boundingBox = null;
    this.contrastElement = $(contrastElement || '.container');
    this.init();
}
BackTop.prototype.renderUI = function() {
    this.boundingBox = $(
        "<div id='gotoTop'><button class='back_to_top'></button><a class='feedback' href='#'></a></div>"
    )

    this.boundingBox.appendTo(document.body);
    // 先消失
    this.boundingBox.hide();
    this.show();
}
BackTop.prototype.show = function() {
    var self = this;
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        if (top > 400) {
            self.boundingBox.fadeIn(200);
        } else if (top < 400) {
            self.boundingBox.fadeOut(200);
        }

    });
}
BackTop.prototype.syncUI = function() {
    var self = this;

    var cLeft = this.contrastElement.offset().left;
    var cWidth = this.contrastElement.width();

    this.boundingBox.css({
        left: cLeft + cWidth + 20 + 'px'
    })

    $(window).resize(function() {
        var cLeft = self.contrastElement.offset().left;
        var cWidth = self.contrastElement.width();

        self.boundingBox.css({
            left: cLeft + cWidth + 20 + 'px'
        })
    })
}
BackTop.prototype.toTop = function() {
    var self = this;

    this.boundingBox.find('button.back_to_top').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500)
    })
}
BackTop.prototype.init = function() {
    this.renderUI();
    this.syncUI();
    this.toTop();
}

module.exports = BackTop;
