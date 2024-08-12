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
                    var form = "request_id="+store.get('request_id')+"&request_code="+code;
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://sms.casamerkado.com/api.php?casamerkado=PAssw0rd&action=check",
                        "method": "POST",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "headers": {
                            "cache-control": "no-cache",
                            "CASAMERKADO": "PAssw0rd"
                        },
                        "data": form
                    }
                    e.removeAttribute("data-kt-indicator"), e.disabled = !1
                    $.ajax(settings).done(function(response) {
                        if(response=='0'){
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
                                    window.location = 'authenticated.asp';
                                }
                            }))
            
                        }else{
                            swal.fire({
                                text: "Invalid Code. " + response,
                                icon: "error",
                                buttonsStyling: !1,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-light-primary"
                                }
                            })
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

    var form1 = "request_id="+store.get('request_id');
    $.post('https://sms.casamerkado.com/api.php?casamerkado=PAssw0rd&action=cancel',form1).always(function(response1) {
        $.post('https://sms.casamerkado.com/api.php?casamerkado=PAssw0rd&action=verify').always(function(response) {
            if(response.startsWith("error")){
                swal.fire({
                    text: "Verification did not proceed contact your system admin.",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                })
            }else{
                store.set('request_id',response);
            }
            
        });
    });

	$('#requestNewTest').click(function(){
		var form = "request_id="+store.get('request_id');
		$.post('https://sms.casamerkado.com/api.php?casamerkado=PAssw0rd&action=cancel',form).always(function(response) {
			if(response=='0'){
				$.post('https://sms.casamerkado.com/api.php?casamerkado=PAssw0rd&action=verify').always(function(response) {
					if(response.startsWith("error")){
                        swal.fire({
                            text: 'Verification did not proceed contact your system admin.',
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary"
                            }
                        })
					}else{
						store.set('request_id',response);
                        swal.fire({
                            text: 'Request has been sent.',
                            icon: "success",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-light-primary"
                            }
                        })
					}
					
				});

			}else{
                swal.fire({
                    text: response,
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                })
			}
		});

	});
    $('input').bind('keypress', function (e) {
        var tabindex = $(this).attr('tabindex');
        tabindex++; 
        $('input[tabindex="'+tabindex+'"]').focus();
    });
}));