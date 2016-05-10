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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var PopupSign = __webpack_require__(1);

	$(function(){
		$('#avatar_mask').on('click',function(){
			console.log('aaaa');
		})



	})

/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);