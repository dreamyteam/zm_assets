

function Tab(config) {
    this.config = config || {};
    this.selector = $(this.config.selector) || $('.program_tab');

    this.tabTags = this.selector.find(this.config.tabTags || '.tab_tags');
    this.tabContents = this.selector.find(this.config.tabContents || '.tab_contents');

    this.init();
}

Tab.prototype.init = function() {

    var tabTagsList = this.tabTags.find('li');
    var contentList = this.tabContents.find('li');


    tabTagsList.each(function() {
        $(this).on('click', function() {
            var index = $(this).index();
            //除去标题的active类
            tabTagsList.each(function() {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            //处理底部容器
            contentList.each(function() {
                $(this).removeClass('show');
            });
            contentList.eq(index).addClass('show');
        })
    })

};

module.exports = Tab;
