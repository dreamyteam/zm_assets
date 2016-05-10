function FixTop(el) {
    this.el = el || $('#program_nav');
    this.init();
}
FixTop.prototype.init = function() {
    var self = this;
    if (this.el.length > 0) {
        var oriOffsetTop = this.el.offset().top;
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > oriOffsetTop) {
                self.el.addClass('program_nav_scroll');
            } else {
                self.el.removeClass('program_nav_scroll');
            }
        })
    }
}

module.exports = FixTop
