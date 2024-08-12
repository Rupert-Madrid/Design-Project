"use strict";
var KTSigninTwoSteps = function() {
    var t, e;
    return {
        init: function() {
            t = document.querySelector("#kt_sing_in_two_steps_form"), (e = document.querySelector("#kt_sing_in_two_steps_submit")).addEventListener("click", (function(n) {
                n.preventDefault();
                var i = !0,
                o = [].slice.call(t.querySelectorAll('input[identity="passcode"]'));
                    var code = '';
                o.map((function(t) {
                    code = code + t.value;
                    "" !== t.value && 0 !== t.value.length || (i = !1)
                })), !0 === i ? (e.setAttribute("data-kt-indicator", "on"), e.disabled = !0, setTimeout((function() {
                    $.get(global_config.systemapi_url + '/Usertable.ashx?action=VALIDATE_OTP&otp='+code).always(function(response) {
                        if(response=="exceed!"){
                            e.removeAttribute("data-kt-indicator"), e.disabled = !1,swal.fire({
                                text: "You exceed the number of attempts",
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-light-primary"
                                }
                            }).then((function(e) {
                                if (e.isConfirmed) {
                                    o.map((function(t) {
                                        t.value = ""
                                    }));
                                    window.location = 'authentication_sms.asp';
                                }   
                            }));
                        }else if(response=="valid!"){
                            e.removeAttribute("data-kt-indicator"), e.disabled = !1, Swal.fire({
                                text: "You have been successfully verified!",
                                icon: "success",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then((function(e) {
                                if (e.isConfirmed) {
                                    o.map((function(t) {
                                        t.value = ""
                                    }));
                                    window.location = 'authenticated.asp';
                                }   
                            }));
                        }else{
                            e.removeAttribute("data-kt-indicator"), e.disabled = !1,swal.fire({
                                text: response,
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-light-primary"
                                }
                            });
                        }
                    });
                }), 1e3)) : swal.fire({
                    text: "Please enter valid securtiy code and try again.",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                }).then((function() {
                    KTUtil.scrollTop()
                }))
            }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTSigninTwoSteps.init()
	$.get(global_config.systemapi_url +'/Usertable.ashx?action=OTP').always(function (data) {
		$.each(data, function (k, v) {
			if(v.ATTEMPT>=5){
                swal.fire({
                    text: "You exceed the number of attempts",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                }).then((function(e) {
                    if (e.isConfirmed) {
                        window.location = "authentication_sms.asp";
                    }   
                }));
			}
		});
	});
    $('input').bind('keypress', function (e) {
        var tabindex = $(this).attr('tabindex');
        tabindex++; 
        $('input[tabindex="'+tabindex+'"]').focus();
    });
}));