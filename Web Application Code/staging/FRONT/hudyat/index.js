
function validateSubmit() {
    Swal.fire({
		text: "Enter last 4 digits of the authorized number.",
		inputType: 'password',
		callback: function(inputpassword) {
			if (inputpassword) {
				var access_params = {
				callback: 'none',
				action: 'LOGIN_NUMBER',
				password: inputpassword
				};
				$.post(global_config.systemapi_url + '/AccessPermission.ashx', access_params).always(function(data) {
					if(data.length>0){
						$('#kt_sign_in_form').submit();
					}else{
                        Swal.fire({
                            text: "Sorry, Invalid number, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
					}
				});
			}
		}
	});	
}

"use strict";
var KTSigninGeneral = function() {
    var t, e, i;
    return {
        init: function() {
            t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, {
                fields: {
                    tuserid: {
                        validators: {
                            notEmpty: {
                                message: "Username is required"
                            }
                        }
                    },
                    tpassword: {
                        validators: {
                            notEmpty: {
                                message: "Password is required"
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row"
                    })
                }
            }), e.addEventListener("click", (function(n) {
                n.preventDefault(), i.validate().then((function(i) {
                    "Valid" == i ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout((function() {
                        // validateSubmit();
						$('#kt_sign_in_form').submit();
                    }), 2e3)) : Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    })
                }))
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTSigninGeneral.init()

    if (typeof window.params.status !== 'undefined') {
      var status = window.params.status;
      if (status === 'error') {
        Swal.fire({
            text: "Sorry, Invalid username Or password, please try again.",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok, got it!",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        })
      } 
      else if (status === 'invalid') {
        Swal.fire({
            text: "Sorry, Invalid, please try again.",
            icon: "error",
            buttonsStyling: !1,
            confirmButtonText: "Ok, got it!",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        })
      }
    }
}));