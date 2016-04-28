var $ = require('jquery');


function Paging(total, current) {
    this.total = total;
    this.current = current;
    this.boundingBox = $('<div class="paging" id="paging"></div>');
    this.init();
}
Paging.prototype.init = function() {
    // console.log(this.boundingBox);
    //TODO 不显示 分页器
    $('.container').append(this.boundingBox);
    var ul = $('<ul></ul>');
    this.boundingBox.append(ul);


    //是否显示prev
    if (this.current != 1) {
        var prevBtn = $("<li><a href=" + (this.current - 1) + "><</a></li>");
        prevBtn.appendTo(ul);
    }

    //插入中间页
    if (this.total <= 7) {
        for (var i = 1, len = this.total + 1; i < len; i++) {
            if (i == this.current) {
                ul.append($("<li class='active'><a href=" + i + ">" + i + "</a></li>"))
            } else {
                ul.append($("<li><a href=" + i + ">" + i + "</a></li>"))
            }
        }
    } else {
        if (this.current <= 4) {
            for (var i = 1, len = 7; i <= len; i++) {
                if (i == this.current) {
                    ul.append($("<li class='active'><a href=" + i + ">" + i + "</a></li>"))
                } else {
                    ul.append($("<li><a href=" + i + ">" + i + "</a></li>"))
                }
            }
        } else {
            var pageStart = this.current - 3;
            console.log(pageStart);
            var pageEnd = (this.current + 3) > this.total ? this.total : (this.current + 3);
            console.log(pageEnd);
            for (var i = pageStart; i <= pageEnd; i++) {
                if (i == this.current) {
                    ul.append($("<li class='active'><a href=" + i + ">" + i + "</a></li>"))
                } else {
                    ul.append($("<li><a href=" + i + ">" + i + "</a></li>"))
                }
            }
        }
    }

    //是否显示next
    if (this.current != this.total) {
        var nextBtn = $("<li><a href=" + (this.current + 1) + ">></a></li>");
        nextBtn.appendTo(ul);
    }

};

module.exports = Paging;
