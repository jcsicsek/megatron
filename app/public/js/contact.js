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
