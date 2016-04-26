$('#register').on('click',function(){
	$('#popup_mask').show();
	$('#popup_register').show();
})

$('button.close').on('click',function(){
	$('.popup_box').hide();
	$('#popup_mask').hide();
})

$('#login').on('click',function(){
	$('#popup_mask').show();
	$('#popup_login').show();
})