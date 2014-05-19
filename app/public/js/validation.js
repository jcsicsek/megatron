var Validation = function () {
  return {
      //Validation
      initValidation: function () {
        // Add validation method
        $.validator.addMethod("creditcard", function(value, element, param) {
          if( /[^0-9\-]+/.test(value) )
          {
            return false;
          }
        },
        $.validator.format('Please enter a valid credit card number.'));

        $(".sky-form").validate({                   
          // Rules for form validation
          rules:
          {
          required:
          {
            required: true
          },
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
          }
        },

        // Messages for form validation
        messages:
        {
         required:
         {
           required: 'This is a required field'
         },
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