$( document ).ready(function() {
// PARSLEY
	$('#inputName').parsley().subscribe('parsley:field:validated', function(fieldInstance){
		if ($('#inputName').parsley().isValid())
	  		$('#name-group').addClass('has-success').removeClass('has-error');
		else
	  		$('#name-group').addClass('has-error').removeClass('has-success');
	});
	$('#inputEmail').parsley().subscribe('parsley:field:validated', function(fieldInstance){
		if ($('#inputEmail').parsley().isValid())
		 	$('#email-group').addClass('has-success').removeClass('has-error');
		else
		 	$('#email-group').addClass('has-error').removeClass('has-success');
	});
	$('#inputMessage').parsley().subscribe('parsley:field:validated', function(fieldInstance){
		if ($('#inputMessage').parsley().isValid())
		 	$('#message-group').addClass('has-success').removeClass('has-error');
		else
		 	$('#message-group').addClass('has-error').removeClass('has-success');
	});
	$('#contact-form').parsley().subscribe('parsley:field:validated', function(fieldInstance){
		if ($('#contact-form').parsley().isValid())
		 	$('#submit').removeClass('disabled');
		else
		 	$('#submit').addClass('disabled');
	});

// AJAX SUBMIT
	$("#contact-form").submit(function(e)
	{
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax(
	    {
	        url : formURL,
	        type: "POST",
	        data : postData,
	        success:function(data, textStatus, jqXHR) 
	        {
	            $('#contact-wrapper').html("<div id='message' class='margin-top-20'></div>");
				$('#message').html("<div class='panel-heading'><h4>Contact Form Submitted!<h4></div>")
					.append("<div class='panel-body'><p>We will be in touch soon.</p></div>")
	        },
	        error: function(jqXHR, textStatus, errorThrown) 
	        {
	            $('#contact-wrapper').html("<div id='message' class='margin-top-20'></div>");
				$('#message').html("<div class='panel-heading'><h4>Uh oh, something went wrong!</h4></div>")
					.append("<div class='panel-body'><p>Try refreshing the page or <a href='/contact'>trying again.</p></div>")    
	        }
	    });
	    e.preventDefault(); //STOP default action
	    e.unbind(); //unbind. to stop multiple form submit.
	});
});