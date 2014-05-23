$( document ).ready(function() {
	$('input[type=radio]').on('change', function () {
	    if (!this.checked) return
	    $('.collapse').not($('div.' + $(this).attr('class'))).hide();
	    $('.collapse.' + $(this).attr('class')).show();
	});
});