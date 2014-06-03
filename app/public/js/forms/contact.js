var ContactForm = function () {
    return {
        //Contact Form
        initContactForm: function () {
          // Validation
          $("#contact-form").validate({
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
                  message:
                  {
                      required: true,
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
                  message:
                  {
                      required: 'Please enter your message'
                  }
              },
                                  
              // Ajax form submission                  
              submitHandler: function(form)
              {
                  $(form).ajaxSubmit(
                  {
                      beforeSend: function()
                      {
                          $('#contact-form button[type="submit"]').attr('disabled', true);
                      },
                      success: function()
                      {
                          $("#contact-form").addClass('submited');
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