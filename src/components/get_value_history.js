var $ = require('jquery');

function GetHistory(el, type) {
    this.el = el;
    this.trendEL = null; //趋势箭头元素
    this.historyDateEL = null; //历史最高日起元素
    this.historyValueEL = null; //历史最高日起值元素
    this.bookId = null; //取到bookid
    this.type = type; //指数type
    this.url = null; //ajax地址
    this.result = null; //ajax 值
    this.init();
}
GetHistory.prototype = {
    init: function() {
        this.trendEL = this.el.find(".arrow");
        this.historyDateEL = this.el.find('.highest_history_date');
        this.historyValueEL = this.el.find('.highest_histroy_value');
        this.bookId = $('#bookId').val();
        this.url = 'http://ipcool.me/index/historyTrend?bookId=' + this.bookId + '&type=' + this.type;
        if(this.el){this.getData();}
    },
    getData: function() {
        var self = this;
        $.ajax({
            url: self.url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(result) {
            	// console.log(result);
                if (result.error_code == 0) {
                    self.result = result.data;
                    self.renderUI();
                }
            }
        })
    },
    renderUI: function() {
        //处理箭头
        switch (this.result.current_index_trend) {
            case "0":
                this.trendEL.html('-');
                break;
            case "1":
                this.trendEL.html('↑');
                break;
            case "2":
                this.trendEL.html('↓');
                break;
            default:
                this.trendEL.html('-');
                break;
        }
        //处理日期
        this.historyDateEL.html(this.result.history_top_date);
        //处理数值
        this.historyValueEL.html(this.result.history_top_value);
    }
}

module.exports = GetHistory;
