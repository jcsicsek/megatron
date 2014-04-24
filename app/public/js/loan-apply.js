$( document ).ready(function() {
// AJAX SUBMIT
	$("#loan-apply-form").submit(function(e)
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
	            $('#loan-apply-wrapper').html("<div id='message' class='margin-top-20'></div>");
				$('#message').html("<div class='panel-heading'><h4>Loan Application Approved!<h4></div>")
					.append("<div class='panel-body'><p><strong>Invoice ID:</strong> " + data.response.id + "</p><p><strong>Payment Terms:</strong> 45 Days Deferred Payment, 100% Due thereafter</p><p><strong>Interest Rate: </strong> 0%</p><div class='row'><div class='col-md-10 col-md-offset-1 margin-tb-30'><button type='submit' value='send' class='btn btn-primary pull-right'>Confirm & Purchase</button><button type='submit' value='send' class='btn btn-danger pull-left'>Decline</button></div></div></div>")
	        },
	        error: function(jqXHR, textStatus, errorThrown) 
	        {
	            $('#loan-apply-wrapper').html("<div id='message' class='margin-top-20'></div>");
				$('#message').html("<div class='panel-heading'><h4>Uh oh, something went wrong!</h4></div>")
					.append("<div class='panel-body'><p>Try refreshing the page and trying again.</p></div>")    
	        }
	    });
	    e.preventDefault(); //STOP default action
	    e.unbind(); //unbind. to stop multiple form submit.
	});
});

