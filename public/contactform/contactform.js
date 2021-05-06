jQuery(document).ready(function ($) {
  "use strict";


  $('form.contactForm').submit(function (e) {
    e.preventDefault();


    var f = $(this).find('.form-group');
    var ferror = false;
    var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    var minCaracthers = 4;


    f.children('input').each(function () {
      var input = $(this);
      var rule = input.attr('data-rule');

      if (rule !== undefined) {
        var inputError = false;

        var pos = rule.indexOf(':', 0);

        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (input.val() === '') {
              ferror = inputError = true;
            }
            break;

          case 'minlen':
            if (input.val().length < minCaracthers) {
              ferror = inputError = true;
            }
            break;

          case 'email':
            if (!emailExp.test(input.val())) {
              ferror = inputError = true;
            }
            break;

          case 'checked':
            if (!input.is(':checked')) {
              ferror = inputError = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(input.val())) {
              ferror = inputError = true;
            }
            break;
        }

        var msgAttr = input.attr('data-msg');
        var msg = msgAttr !== undefined ? msgAttr : 'wrong Input';

        input.next('.validation').html(inputError ? msg : '').show('blind');
      }
    });

    f.children('textarea').each(function () {

      var input = $(this);
      var rule = input.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);

        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (input.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        var msgAttr = input.attr('data-msg');
        var msg = msgAttr != undefined ? msgAttr : 'wrong Input';

        input.next('.validation').html(ierror ? msg : '').show('blind');
      }
    });


    if (ferror)
      return false;
    else
      var str = $(this).serialize();

    var action = $(this).attr('action');

    if (!action) {
      action = '/public/contact.php';
    }



    $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function (msg) {
        if (msg == 'OK') {
          alert("success");
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val();
        } else {
          alert(msg);
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }
        // if (status) {
        //   $('.alert-success').show();
        // }


      }
    });
  });
});