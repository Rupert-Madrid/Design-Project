
/* deserialize jquery serialize method */
function deserialize(identifier) {
    var form_data = identifier.split('&');
    var input     = {};

    $.each(form_data, function(key, value) {
        var data = value.split('=');
        input[data[0]] = decodeURIComponent(data[1]);
    });
    return input;
}
"use strict";
var KTSigninGeneral = function() {
    var t, e, i;
    return {
        init: function() {
            t = document.querySelector("#kt_sign_in_form"), e = document.querySelector("#kt_sign_in_submit"), i = FormValidation.formValidation(t, {
                fields: {
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
                        var mysession = deserialize(Cookies.get(global_config.cookie));
                        var access_params = {
                            callback: 'none',
                            action: 'USERID_PASSWORD',
                            userid: mysession.user_id,
                            password: $('#tpassword').val()
                            };
                            $.post(global_config.systemapi_url + '/AccessPermission.ashx?branch='+mysession.branch, access_params).always(function(data) {
                                if(data.length>0){
                                    window.location = "lockscreen_off.asp";
                                }else{
                                    e.removeAttribute("data-kt-indicator"), e.disabled = !1, Swal.fire({
                                        text: "Invalid password, please try again.",
                                        icon: "error",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    })
                                }
                            });
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
}));