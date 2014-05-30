var SettingsForm = function () {
  return {
    //Payment Form
    initSettingsForm: function () {
      // Setup masks
      $("#phone").mask("(999) 999-9999", {placeholder:'x'});

      // Add phone validator
      $.validator.addMethod(
        "phone_format",
        function(value, element) {
          var check = false;
          return this.optional(element) || /^\(\d{3}\)[ ]\d{3}\-\d{4}$/.test(value);
        },
        "Please enter a valid phone number"
        );

      // Validation
      $("#merchant-settings-form").validate({
        // Rules for form validation
        rules:
        {
          'fname':
          {
            required: true
          },
          'lname':
          {
            required: true
          },
          'phone':
          {
            required: true
          },
          'email':
          {
            required: true,
            email: true
          },
          'company':
          {
            required: true
          },
          'url':
          {
            required: true,
            url: true
          },
          'tabb_url':
          {
            required: true
          }
        },

        // Messages for form validation
        messages:
        {
          'fname':
          {
           required: 'Please enter your first name'
         },
         'lname':
         {
           required: 'Please enter your last name'
         },
         'phone':
         {
           required: 'Please enter your phone number'
         },
         'email':
         {
           required: 'Please enter your email address',
           email: 'Please enter a valid email address'
         },
         'company':
         {
           required: 'Please enter your company name'
         },
         'url':
         {
           required: 'Please enter your company\'s URL',
           url: 'Please enter a valid URL (include http!)'
         },
         'tabb_url':
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
              $("#merchant-settings-form").addClass('submitted');
            }
          });
        },
      });
    }
  };
}();

