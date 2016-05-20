$(function() {

    $("#home_page").fullpage({
        verticalCentered: false,
        afterLoad: function(anchorLink, index) {
           $(".sec_"+index).addClass('active');
        },
    })
})
