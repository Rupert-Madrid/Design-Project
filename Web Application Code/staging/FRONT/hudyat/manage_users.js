var user_access='';

function addrecord() {
	$('#filter').val('');
	$('#filter').trigger('input')
	var grid = $("#grid").data("kendoGrid");
			setTimeout(function() {
				grid.addRow();
			}, 100);
	
}
function accessibleModules(p) {
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);
	var url = 'accessible_modules.asp?USERID='+ dataItem.USERID;
	if (dataItem.LEVEL == "Owner") {
		bootbox.alert("No need to set modules for Owner, Already have Full access");
	} else {
		dynamicWin('accessible_modules', 'Set Accessible Modules [UserID:'+ dataItem.USERID +']', url, 100, "max", true, true);
	}
}
function uploadImage(p) {
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);
	var url = global_config.main_url + '/sysadmin/imageupload.asp?module_code=USER_FILE&refno='+dataItem.USERID;
	dynamicWin("image_upload", "Upload Image", url, 200, "max", true);
}

function FingerprintImage(p) {
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);
	var url = 'https://biometric.casamerkado.com/Enroll.aspx?userid='+dataItem.USERID;
	var winsize = {
		h: 400,
		w: 400
	}
	dynamicWin("fingerprint", "Set Fingerprint: " + dataItem.USERNAME, url, winsize, null, false);
}

function view_photo(p) {
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);
	var photopath =global_config.main_url + '/systemapi/GetImage.ashx?module_code=USER_FILE&refno='+dataItem.USERID+'&cache='+Math.random();
	var winsize = {
		h: 400,
		w: 400
	}
	store.set('photo_frame', photopath);
	dynamicWin("viewphoto", "View Photo: " + dataItem.USERNAME, 'photo_viewer.asp', winsize, null, false);
}
function dropdownEditor(container, options) {
	 var listdata = [];
	 if (options.field == "STATUS") {
			listdata = [
				{ OPTIONTEXT: "LOGIN", OPTIONVALUE: "LOGIN" },
				{ OPTIONTEXT: "LOGOUT", OPTIONVALUE: "LOGOUT" },
			];	
			var input = $('<input name="' + options.field + '" required="required" />');
			input.appendTo(container);
			input.kendoDropDownList({
					   dataTextField: "OPTIONTEXT",
					   dataValueField: "OPTIONVALUE",
					   dataSource: {
							   data: listdata
					   }
			   });	 
	 }
	 else 
	 if (options.field == "BRANCH") {
		$('<input type="text" name="' + options.field + '"/>')
			.appendTo(container)
			.kendoComboBox({
				valuePrimitive: true,
				autoBind: false,
				dataTextField: "BRANCH",
				dataValueField: "BRANCH",
				dataSource: {
					transport: {
						read: {
							url: global_config.acctg_api_url + "/Branch.ashx?action=ALL&criteria=ALL",
							dataType: "json"
						}
					}
				},
				filter: "contains",
				suggest: true
			}); 
	 }
	 else {
			listdata = [
							{ OPTIONTEXT: "YES", OPTIONVALUE: "YES" },
							{ OPTIONTEXT: "NO", OPTIONVALUE: "NO" },
			];
			var input = $('<input name="' + options.field + '" required="required" />');
			input.appendTo(container);
			input.kendoDropDownList({
					   dataTextField: "OPTIONTEXT",
					   dataValueField: "OPTIONVALUE",
					   dataSource: {
							   data: listdata
					   }
			   });
	 }
}

function addrecord() {
	$('#filter').val('');
	$('#filter').trigger('input')
	var grid = $("#grid").data("kendoGrid");
			setTimeout(function() {
				grid.addRow();
			}, 100);
	
}
function users() {
  /*-GET usertable IN THE API AND LIST IT TO THE GRID-*/
	var crudServiceBaseUrl = global_config.systemapi_url;
	var dataSource = new kendo.data.DataSource({
			transport: {
				read: {
					url: crudServiceBaseUrl  + '/UserTable.ashx?action=ALL&criteria=ALL',
					dataType: "json"
				},
				create: {
					url: crudServiceBaseUrl  + '/UserTable.ashx?action=SAVE',
					dataType: "json"
				},
				update: {
					url: crudServiceBaseUrl  + '/UserTable.ashx?action=UPDATE',
					dataType: "json"
				},
				destroy: {
					url: crudServiceBaseUrl  + '/UserTable.ashx?action=DELETE',
					dataType: "json"
				},
				parameterMap: function(options, operation) {
					var data = {};
					var url = {};
					if (operation === "create") {
						data = options.models[0];
						url = json2param(data);
						return url;
					}
					if (operation === "update") { 
						data = options.models[0];
						url = json2param(data);
						return url;
					}
					if (operation === "destroy") {
						data = options.models[0];
						url = json2param(data);
						return url;
					}
					if (operation !== "read" && options.models) {
						return {
							models: kendo.stringify(options.models)
						};
					}
				}
			},
			error: function(e) {
				bootbox.alert(e.xhr.responseText);
			},
			batch: true,
			schema: {
				model: {
					id: "USERID",
					fields: {
						USERID: { type: "string", defaultValue: "", validation: { required: true } },
						USERNAME: { type: "string", defaultValue: "",  validation: { required: true } },
						LEVEL: { type: "string", defaultValue: " ",  validation: { required: true } },
						PASSWORD: {  defaultValue: "", validation: { required: true } },
						PINCODE: { validation: { required: false } },
						STATUS: { type: "string", defaultValue: "LOGOUT", validation: { required: true } }
					}
				}
			}
	});
	displayLoading($('body'));
	$("#grid").kendoGrid({
			dataSource: dataSource,
			height: $(document).height()-305,
		  resizable: true,	
		  scrollable: true,
          editable: {
            mode: "popup",
            window: {
              title: "Manage Users",
              animation: false,
              width: "450px",
              height: "300px"
            }
          },
			columns: [
				{
					field: "USERNAME",
					title: "Name",
					width: "80px",
					editor:  function(container, options) {
						 var input = $('<input name="' + options.field + '" type="text" class="k-textbox" required="required" autocomplete="off"/>');
						 input.appendTo(container);
				   }
				},
				{
					field: "USERID",
					title: "Username",
					width: "80px"
				},
				{
					field: "PASSWORD",
					title: "Password",
					template: "<span>#: PASSWORD == null ? ' ' : '●'.repeat( PASSWORD.length) #</span>",
					width: "80px",
				},
				{
					field: "PINCODE",
					title: "Pincode",
					template: "<span>#: PINCODE == null ? ' ' : '●'.repeat( PINCODE.length) #</span>",
					width: "80px",
				},
				{
					field: "LEVEL",
					title: "Level",
					width: "80px",
					editor:  function(container, options) {
						 var input = $('<input name="' + options.field + '" required="required" />');
						 input.appendTo(container);
						 input.kendoDropDownList({
									autoBind: false,
									dataTextField: "LEVELCODE",
									dataValueField: "LEVELNAME",
									dataSource: {
											data: [
												{ LEVELCODE: "Admin", LEVELNAME: "Admin" },
												{ LEVELCODE: "Owner", LEVELNAME: "Owner" },
												{ LEVELCODE: "User", LEVELNAME: "User" }
											]
									}
							});
				   }
				},
				{
				  name: "selectitem",
				  template: `
					  <a class='btn btn-light btn-sm customEdit' title='Edit Page'><span class='fa fa-edit'></span></a>
					  <a class='btn btn-light btn-sm customDelete' title='Delete Page'><span class='fa fa-trash'></span></a>
					  <a class='btn btn-light btn-sm' onclick='accessibleModules(this)' title='Select Modules'><span class='fa fa-file'></span></a>
					  `,
				  title: "Actions",
				  width: "80px",	
				  attributes: {
					class: "text-center"
				  }
				}
			],
			edit: function(e) {
				e.container.find(".k-edit-label:last").hide();
				e.container.find(".k-edit-field:last").hide();
					//Change window title
					if (e.model.isNew())// If the new record is being added
					{
							$(".k-window-title").text("New Record");
					}
					else// If the record is being edited
					{
						e.container.find("input[name=USERID]").attr("readonly", true);
							$(".k-window-title").text("Edit Record");
							//hide all the elements with class "hide-on-edit" on edit
							e.container.find('.hide-on-edit').hide();
					}
			},
		  dataBound: function(e) {
				hideLoading($('body'));
				var grid = this;
				var cnt = grid.dataSource.total();
				var count =0;
				$.each(grid.tbody.find('tr'), function() {
					var model = grid.dataItem(this);
					if(model.LEVEL.toUpperCase()!=="WAITER"){
						count = count + 1;
					}
				});
				$('#recordcount').text("Record(s):" +count);
			},
	});
}

function user_search() {
	$('#filter').on('input', function(e) {
		var grid = $('#grid').data('kendoGrid');
		var columns = grid.columns;

		var filter = {
			logic: 'or',
			filters: []
		};
		columns.forEach(function(x) {
			if (x.field) {
				var type = grid.dataSource.options.schema.model.fields[x.field].type;
				if (type == 'string') {
					filter.filters.push({
						field: x.field,
						operator: 'contains',
						value: e.target.value
					})
				} else if (type == 'number') {
					if (isNumeric(e.target.value)) {
						filter.filters.push({
							field: x.field,
							operator: 'eq',
							value: e.target.value
						});
					}

				} else if (type == 'date') {
					var data = grid.dataSource.data();
					for (var i = 0; i < data.length; i++) {
						var dateStr = kendo.format(x.format, data[i][x.field]);
						// change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
						if (dateStr.startsWith(e.target.value)) {
							filter.filters.push({
								field: x.field,
								operator: 'eq',
								value: data[i][x.field]
							})
						}
					}
				} else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
					var bool = getBoolean(e.target.value);
					filter.filters.push({
						field: x.field,
						operator: 'eq',
						value: bool
					});
				}
			}
		});
		grid.dataSource.filter(filter);
	});
}


$(document).ready(function() {
  var mysession = deserialize(Cookies.get(global_config.cookie));
  if(mysession.user_level=='Owner' || mysession.user_level=='Admin'){
    user_access='';
    $('#btnemail').addClass('hide');
  } else {
    user_access='disabled';
    $('#btn-add').addClass('disabled');
  }
  users();
	
	user_search();
});

$('#btnclear').click(function() {
  $('#userid').val('')
  $('#username').val('')
  $('#level').val('')
  $('#user_pass').val('')
  $('#user_pin').val('')
  $('#userid').prop('disabled', false)
  $('#checkall').prop('disabled', false)
  $('#checkall').prop('checked', false)
  store.remove('edit')
  program_rights();
});
