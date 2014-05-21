var ViewStatement = function () {
    return {
        //Contact Form
        initViewStatement: function () {
          // Validation
          $("#view-statement").validate({
              // Rules for form validation
              rules:
              {
                  phone:
                  {
                    required: true
                  },
                  invoiceId:
                  {
                    required: true,
                    rangelength: [4, 6]
                  }
              },
                                  
              // Messages for form validation
              messages:
              {
                  phone:
                  {
                   required: 'Please enter your phone number'
                  },
                  invoiceId:
                  {
                    required: 'Please enter your purchase code',
                    rangelength: 'Please enter a purchase code that is 4-6 characters long'
                  }
              },
                                  
              // // Ajax form submission                  
              // submitHandler: function(form)
              // {
              //     $(form).ajaxSubmit(
              //     {
              //         beforeSend: function()
              //         {
              //             $('#view-statement button[type="submit"]').attr('disabled', true);
              //         },
              //         success: function()
              //         {
              //             $("#view-statement").addClass('submited');
              //         }
              //     });
              // },
              
              // Do not change code below
              errorPlacement: function(error, element)
              {
                  error.insertAfter(element.parent());
              }
          });
        }

    };
    
}();