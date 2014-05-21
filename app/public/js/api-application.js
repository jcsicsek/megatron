var ApiRequest = function () {
    return {
        //Contact Form
        initApiRequest: function () {
          // Validation
          $("#api-request").validate({
              // Rules for form validation
              rules:
              {
                  name:
                  {
                      required: true
                  },
                  email:
                  {
                      required: true,
                      email: true
                  },
                  company:
                  {
                    required: true
                  },
                  c_address:
                  {
                    required: true
                  },
                  phone:
                  {
                    required: true
                  },
                  message:
                  {
                      minlength: 10
                  }
              },
                                  
              // Messages for form validation
              messages:
              {
                  name:
                  {
                      required: 'Please enter your name',
                  },
                  email:
                  {
                      required: 'Please enter your email address',
                      email: 'Please enter a VALID email address'
                  },
                  company:
                  {
                   required: 'Please enter your company name'
                  },
                  c_address:
                  {
                   required: 'Please enter your company address or website'
                  },
                  phone:
                  {
                   required: 'Please enter your phone number'
                  },
                  message:
                  {
                      minlength: 'Please enter at least 10 characters for your note'
                  }
              },
                                  
              // Ajax form submission                  
              submitHandler: function(form)
              {
                  $(form).ajaxSubmit(
                  {
                      beforeSend: function()
                      {
                          $('#api-request button[type="submit"]').attr('disabled', true);
                      },
                      success: function()
                      {
                          $("#api-request").addClass('submited');
                      }
                  });
              },
              
              // Do not change code below
              errorPlacement: function(error, element)
              {
                  error.insertAfter(element.parent());
              }
          });
        }

    };
    
}();