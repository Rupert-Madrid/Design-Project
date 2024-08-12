
var KTLessonGeneral = function() {
    var t, e, i;
    return {
        init: function() {
            t = document.querySelector("#kt_lesson_form"), e = document.querySelector("#kt_lesson_submit"), i = FormValidation.formValidation(t, {
                fields: {
                    title: {
                        validators: {
                            notEmpty: {
                                message: "Title is required"
                            }
                        }
                    },
                    date: {
                        validators: {
                            notEmpty: {
                                message: "Date is required"
                            }
                        }
                    },
                    timein: {
                        validators: {
                            notEmpty: {
                                message: "Time is required"
                            }
                        }
                    },
                    timeout: {
                        validators: {
                            notEmpty: {
                                message: "Time is required"
                            }
                        }
                    },
                    type: {
                        validators: {
                            notEmpty: {
                                message: "Select Type"
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
                        e.removeAttribute("data-kt-indicator"), e.disabled = !1
                        var form = $('#kt_lesson_form').serialize();
                        var grid = $('#grid').data('kendoGrid');
                        var details = grid.dataSource.view();
                        var params = {
                            "details": kendo.stringify(details)
                        }
                        
                        //save record
                        var action = $('#plan_code').data('action');
                        var mysession = deserialize(Cookies.get(global_config.cookie));
                        $.post(global_config.lesson_api_url + '/LessonPlan.ashx?action='+action+'&'+form+'&email='+mysession.email,params).always(function(data){
                            if(data=="success"){
                                Swal.fire({
                                    text: "You have successfully created a Lesson Plan",
                                    icon: "success",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then((function(t) {
                                    window.location="index.asp";
                                }))
                            }else{
                                Swal.fire({
                                    text: data,
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
function uploadfiles(){
	if ($('#plan_code').val()==''){
		bootbox.alert('Save module first before you attach files');
		return false;
	}
	var winsize = {
		h:500,
		w:600
	}
  var url = 'transaction_attachments.asp?module_code=LESSONS&refno=' + $('#plan_code').val();
  dynamicWin("upload_attachment", "Upload Attachments", url, winsize, null, true);
}

function delete_tran(p) {
	var grid = $('#grid').data('kendoGrid');
	grid.select(grid.tbody.find("tr[data-uid='" + $(p).attr('id') + "']"));
	if (grid.dataSource.data().length > 0) {
		grid.select().each(function() {
			grid.dataSource.remove(grid.dataItem($(this).closest("tr")));
		});
	}
}
function newfile(){
	var params = {
		TOPICS: "",
        STATUS:""
	}
	$('#grid').data().kendoGrid.dataSource.add(params); // add selected items on browsing
}
function listgrid(){
    var plan_code = window.params.plan_code;
    if(plan_code == undefined){
        plan_code=0;
        $('#plan_code').data('action','SAVE');
        $('#course_lbl').text(window.params.code);
        $('#course_code').val(window.params.code);
        $('#back_courses').attr('href','courses.asp');
    }else{
        $('#plan_code').data('action','UPDATE');
        $('#back_courses').attr('href','dashboard.asp');
    }
    var mysession = deserialize(Cookies.get(global_config.cookie));
    $.get(global_config.lesson_api_url + "/LessonPlan.ashx?action=BY_ID&email="+mysession.email+"&criteria="+plan_code).always(function(data){
        $.each(data, function(k,v){
            $('#plan_code').val(v.PLAN_CODE);
            $('#title').val(v.TITLE);
            $('#date').val(moment(v.DATE).format('MMMM DD, YYYY'));
            $('#timein').val(moment(v.TIMEIN).format('HH:mm'));
            $('#timeout').val(moment(v.TIMEOUT).format('HH:mm'));
            $("input[name=type][value=" + v.TYPE + "]").attr('checked', 'checked');
            $('#course_lbl').text(v.COURSE_CODE);
            $('#course_code').val(v.COURSE_CODE);
        });
    });
    $('#grid').empty();
	//sales order  DATA SOURCE
	var dataSource = new kendo.data.DataSource({
		transport: {
			read: {
				url: global_config.lesson_api_url + "/LessonPlan.ashx?action=ILO&criteria="+plan_code,
				dataType: "json"
			},
			parameterMap: function(options, operation) {
				if (operation !== "read" && options.models) {
					return {
						models: kendo.stringify(options.models)
					};
				}
			}
		},
		error: function(e) {
			if (e.xhr.responseText.startsWith("deleted")) {}
			if (e.xhr.responseText.startsWith("error:")) {
				alert(e.xhr.responseText);
			}
		},
		batch: true,
		schema: {
			model: {
				fields: {
					CHARGECODE: {},
					LINENO: {editable:false},
					CATCODE: {editable:false},
					CHARGEDESCRIPTION: {},
					UOM: {},
					WHCODE: {},
					QTY: {
						type: "number"
					},
					SELLINGPRICE: {
						type: "number",
						editable:true
					},
					AMOUNT: {
						type: "number"
					},
					ID: {}
				}
			}
		}
	});

	var grid = $("#grid").kendoGrid({
		dataSource: dataSource,
		selectable: "row",
		editable: true,
		resizable: true,
		height: 200,
		columns: [
            { 
                template: '<input type="checkbox" #= STATUS ? \'checked="checked"\' : "" # class="chkbx"/>', 
                title: "h", 
                width: "40px",
                 attributes: 
                 {
                    class: "k-text-center"
                 } 
            },
			{
				field: "TOPICS",
				title: "Intended Learning Outcome",
				width: "120px"
			},
			{
				name: "deleteitem",
				template: "<button class='btn'  id='${ uid }' onclick='delete_tran(this)'><i class='fa fa-trash'></i></button>",
				width: "40px"
			},
		],
		edit: function(e) {
			//DISABLE EDIT MODE
			var grid = $('#grid').data('kendoGrid');
			grid.tbody.find("tr").removeClass('k-state-selected');
			grid.tbody.find("tr[data-uid='" + e.model.uid + "']").addClass('k-state-selected');
			var item = grid.dataItem(grid.select());
			var row = grid.select().index();
			var cellindex = grid.cellIndex(e.container);
			if(row == (grid.dataSource.total()-1)){
				newfile();
				grid.editCell(grid.tbody.find(">tr:eq("+row+") >td:eq("+cellindex+")"));
				grid.select(grid.tbody.find("tr[data-uid='" + item.uid + "']"));
				grid.current(grid.tbody.find(">tr:eq("+row+") >td:eq("+cellindex+")"));
			}
		},
		cellClose: function(e) {
			var grid = this;
		},
		dataBound: function() {
			var grid = this;
			if(grid.dataSource.total()==0){
				newfile();
			}
		}

	}).data('kendoGrid');
    $("#grid .k-grid-content").on("change", "input.chkbx", function(e) {
      var grid = $("#grid").data("kendoGrid"),
          dataItem = grid.dataItem($(e.target).closest("tr"));
          var status = this.checked;
        if(!status){
            status = '';
        }
      dataItem.set("STATUS", status);
    });
}

$(document).ready(function(){
	$("#date").daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		minYear: 1901,
		maxYear: parseInt(moment().format("YYYY"),10),
        locale: {
            format: "MMMM DD, YYYY"
        }
	});
    KTLessonGeneral.init();
    listgrid();
});