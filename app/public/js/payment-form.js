var PaymentForm = function () {
  return {
    //Contact Form
    initPaymentForm: function () {
      // Validation
      $("#payment-form").validate({
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
          phone:
          {
            required: true
          },
          email:
          {
            required: true,
            email: true
          },
          city:
          {
            required: true
          },
          state:
          {
            required: true
          },
          zip_code:
          {
            required: true,
            digits: true
          },
          address:
          {
            required: true
          },
          country:
          {
            required: true
          },
          name:
          {
            required: true
          },
          card:
          {
            required: true,
            creditcard: true
          },
          cvv:
          {
            required: true,
            digits: true
          },
          month:
          {
            required: true
          },
          year:
          {
            required: true,
            digits: true
          },
          account:
          {
            required: true,
            digits: true
          },
          routing:
          {
            required: true,
            digits: true
          },
          type:
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
         phone:
         {
           required: 'Please enter your phone number'
         },
         email:
         {
           required: 'Please enter your email address',
           email: 'Please enter a valid email address'
         },
         city:
         {
           required: 'Please enter your billing city'
         },
         state:
         {
           required: 'Please enter your billing state'
         },
         zip_code:
         {
           required: 'Please enter your billing zip code',
           digits: 'Please enter a valid billing zip code'
         },
         address:
         {
           required: 'Please enter your billing street address'
         },
         country:
         {
           required: 'Please enter your billing country'
         },
         name:
         {
           required: 'Please enter your billing name'
         },
         card:
         {
           required: 'Please enter your card number'
         },
         cvv:
         {
           required: 'Please enter your CVV',
           digits: 'Please enter a valid CVV'
         },
         month:
         {
           required: 'Please choose your expiration month'
         },
         year:
         {
           required: 'Please enter your expiration year',
           digits: 'Please enter a valid year'
         },
         account:
         {
           required: 'Please enter an account number',
           digits: 'Please enter a valid account number'
         },
         routing:
         {
           required: 'Please enter a routing number',
           digits: 'Please enter a valid routing number'
         },
         type:
         {
           required: 'Please indicate the type of bank account'
         }
       },

        // Ajax form submission                  
        submitHandler: function(form)
        {
          $(form).ajaxSubmit(
          {
            beforeSend: function()
            {
              $('#payment-form button[type="submit"]').attr('disabled', true);
            },
            success: function()
            {
              $("#payment-form").addClass('submited');
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