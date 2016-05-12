/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var Paging = __webpack_require__(13);
	var BackTop = __webpack_require__(5);

	$(function() {

	    //分页
	    var paging = new Paging('#paging');

	    //返回顶部
	    var backTop = new BackTop();
	})


/***/ },

/***/ 5:
/***/ function(module, exports) {

	// 设置位置元素
	function BackTop(contrastElement) {
	    this.boundingBox = null;
	    this.contrastElement = $(contrastElement || '.container');
	    this.init();
	}
	BackTop.prototype.renderUI = function() {
	    if ($('#gotoTop').length > 0) {
	        this.boundingBox = $('#gotoTop');
	    } else {
	        this.boundingBox = $(
	            "<div id='gotoTop'><button class='back_to_top'></button><a class='feedback' href='#'></a></div>"
	        )
	        this.boundingBox.appendTo(document.body);
	    }
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


/***/ },

/***/ 13:
/***/ function(module, exports) {

	function Paging(element) {
	    this.element = $(element);
	    this.url = window.location.pathname;
	    this.pageAttach = this.element.data("pageAttach");
	    if (this.element.length > 0) {
	        this.init();
	    }

	}
	Paging.prototype.init = function() {
	    var totalNum = this.pageAttach.totalNum;
	    var current = this.pageAttach.currentPage;
	    var pageSize = this.pageAttach.pageSize;
	    var total = Math.ceil(totalNum / pageSize);
	    var content = this.pageAttach.content;
	    if (pageSize <= totalNum) {
	        var ul = $('<ul></ul>');
	        this.element.append(ul);
	        //是否显示prev
	        if (current != 1) {
	            var prevBtn = $("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + (current - 1) + "><</a></li>");
	            prevBtn.appendTo(ul);
	        }

	        //插入中间页
	        if (total <= 7) {
	            for (var i = 1, len = total + 1; i < len; i++) {
	                if (i == current) {
	                    ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                } else {
	                    ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                }
	            }
	        } else {
	            if (current <= 4) {
	                for (var i = 1, len = 7; i <= len; i++) {
	                    if (i == current) {
	                        ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    } else {
	                        ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    }
	                }
	            } else {
	                var pageStart = current - 3;
	                // console.log(pageStart);
	                var pageEnd = (current + 3) > total ? total : (current + 3);
	                // console.log(pageEnd);
	                for (var i = pageStart; i <= pageEnd; i++) {
	                    if (i == current) {
	                        ul.append($("<li class='active'><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    } else {
	                        ul.append($("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + i + ">" + i + "</a></li>"))
	                    }
	                }
	            }
	        }

	        //是否显示next
	        if (current != total) {
	            var nextBtn = $("<li><a href=" + this.url + '?content=' + content + '&currentPage=' + (current + 1) + ">></a></li>");
	            nextBtn.appendTo(ul);
	        }
	    }
	};

	module.exports = Paging;


/***/ }

/******/ });