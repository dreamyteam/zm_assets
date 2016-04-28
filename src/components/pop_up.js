var $ = require('jquery');

function Popup(element) {
	this.element = $(element);
	this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	this.init();
}
Popup.prototype.init = function(){
	this.close();
};
Popup.prototype.alert = function(){
	this.mask.appendTo("body");
	this.element.show();
};
Popup.prototype.destory = function(){
	this.mask.remove();
	this.element.hide();
};
Popup.prototype.close = function(){
	var self = this;
	if(this.element.find('button.close')){
		var btnClose = this.element.find('button.close');
		btnClose.on('click',function(){
			self.destory();
		})
	}
}

module.exports = Popup;
