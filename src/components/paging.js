var $ = require('jquery');


function Paging(element) {
    this.element = $(element);
    this.url = window.location.pathname;
    this.pageAttach = this.element.data("pageAttach");
    this.init();
}
Paging.prototype.init = function() {
    var total = this.pageAttach.totalNum;
    var current = this.pageAttach.currentPage;
    var pageSize = this.pageAttach.pageSize;
    var content = this.pageAttach.content;
    //TODO 不显示 分页器
    var ul = $('<ul></ul>');
    this.element.append(ul);
    //是否显示prev
    if (current != 1) {
        var prevBtn = $("<li><a href="+ this.url +'?content='+content+'&currentPage='+(current-1)+"><</a></li>");
        prevBtn.appendTo(ul);
    }

    //插入中间页
    if (total <= 7) {
        for (var i = 1, len = total + 1; i < len; i++) {
            if (i == current) {
                ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
            } else {
                ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
            }
        }
    } else {
        if (current <= 4) {
            for (var i = 1, len = 7; i <= len; i++) {
                if (i == current) {
                    ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
                } else {
                    ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
                }
            }
        } else {
            var pageStart = current - 3;
            // console.log(pageStart);
            var pageEnd = (current + 3) > total ? total : (current + 3);
            // console.log(pageEnd);
            for (var i = pageStart; i <= pageEnd; i++) {
                if (i == current) {
                    ul.append($("<li class='active'><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
                } else {
                    ul.append($("<li><a href="+ this.url +'?content='+content+'&currentPage='+i+">" + i + "</a></li>"))
                }
            }
        }
    }

    //是否显示next
    if (current != total) {
        var nextBtn = $("<li><a href="+ this.url +'?content='+content+'&currentPage='+(current+1)+">></a></li>");
        nextBtn.appendTo(ul);
    }

};

module.exports = Paging;
