var MerchantSettingsForm = function () {
  return {
    //Contact Form
    initMerchantSettingsForm: function () {
      // Validation
      $("#merchant-settings-form").validate({
        // Rules for form validation
        rules:
        {
          fname:
          {
            required: true
          },
          lname:
          {
            required: true
          },
          company:
          {
            required: true
          },
          url:
          {
            required: true,
            url: true
          },
          phone:
          {
            required: true
          },
          email:
          {
            required: true,
            email: true
          },
          tabb_url:
          {
            required: true
          }
        },

        // Messages for form validation
        messages:
        {
          fname:
          {
           required: 'Please enter your first name'
         },
         lname:
         {
           required: 'Please enter your last name'
         },
         company:
         {
           required: 'Please enter your company name'
         },
         url:
         {
           required: 'Please enter your company\'s URL',
           url: 'Please enter a valid URL (include http!)'
         },
         phone:
         {
           required: 'Please enter your phone number'
         },
         email:
         {
           required: 'Please enter your email address',
           email: 'Please enter a valid email address'
         },
         tabb_url:
         {
           required: 'Please enter a name for your spot on tabb.io'
         }
       },

        // Ajax form submission                  
        submitHandler: function(form)
        {
          $(form).ajaxSubmit(
          {
            beforeSend: function()
            {
              $('#merchant-settings-form button[type="submit"]').attr('disabled', true);
            },
            success: function()
            {
              $("#merchant-settings-form").addClass('submited');
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