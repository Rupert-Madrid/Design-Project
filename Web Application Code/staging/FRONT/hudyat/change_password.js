
"use strict";
var KTSigninGeneral = function() {
    var e, t, a, s, r = function() {
        return 100 === s.getScore()
    };
    return {
        init: function() {
            e = document.querySelector("#change_pass_form"), t = document.querySelector("#kt_changepass_submit"), s = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')), a = FormValidation.formValidation(e, {
                fields: {
                    password: {
                        validators: {
                            notEmpty: {
                                message: "New password is required"
                            },
                            callback: {
                                message: "Please enter valid password",
                                callback: function(e) {
                                    if (e.value.length > 0) return r()
                                }
                            }
                        }
                    },
                    old_password: {
                        validators: {
                            notEmpty: {
                                message: "Old Password is required"
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row"
                    })
                }
            }), t.addEventListener("click", (function(n) { 
                n.preventDefault(), a.revalidateField("password"), a.validate().then((function(a) {
                    "Valid" == a ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, setTimeout((function() {
                            var frm = $('#change_pass_form').serialize();
                            $.post(global_config.systemapi_url + '/UserTable.ashx?action=CHANGE_PASSWORD', frm).always(function(data) {
                                if(data.responseText.startsWith("saved")){
                                    Swal.fire({
                                        text: "Password Succesfully Saved.",
                                        icon: "success",
                                        buttonsStyling: !1,
                                        confirmButtonText: "Ok, got it!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then( function(){
                                        window.location = 'dashboard.asp';
                                    });
                                }else{
                                    t.removeAttribute("data-kt-indicator"), t.disabled = !1, Swal.fire({
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
var user_id = $('#user_image').attr('userid');
var image_path = global_config.main_casa_url + "/systemapi/GetImage.ashx?module_code=USER_FILE&refno="+user_id+"&cache="+Math.random();
$('#user_image').attr('src',image_path);
$('#user_image2').attr('src',image_path);
