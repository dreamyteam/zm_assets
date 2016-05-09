

function FixTop(element) {
    this.element = element || $('#program_nav');
    this.init();
}
FixTop.prototype.init = function() {
    var oriOffsetTop = $('#program_nav').offset().top;
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > oriOffsetTop) {
            $('#program_nav').addClass('program_nav_scroll');
        } else {
            $('#program_nav').removeClass('program_nav_scroll');
        }
    })
}

module.exports = FixTop