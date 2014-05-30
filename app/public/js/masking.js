var Masking = function () {

    return {
        
        //Masking
        initMasking: function () {
	        $("#phone").mask('(999) 999-9999', {placeholder:'x'});
	        $('#cvv').mask('999', {placeholder:'x'});
	        $('#card').mask('9999-9999-9999-9999', {placeholder:'x'});
	        $('#year').mask('2099', {placeholder:'x'});
        }

    };
    
}();