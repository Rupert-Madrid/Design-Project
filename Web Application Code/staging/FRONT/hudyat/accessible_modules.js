function clone_button(){
	var url = 'clone_rights.asp?USERID='+window.params.USERID;
	var winsize = {
		h:500,
		w:500
	}
	dynamicWin('clone_rights', 'Clone User Rights for [UserID:'+ window.params.USERID +']', url, winsize, null, true, true);
}
function process() {
  /*-GET record IN THE API AND LIST IT TO THE GRID-*/
	var crudServiceBaseUrl = global_config.systemapi_url;
	var dataSource = new kendo.data.DataSource({
			transport: {
				read: {
					url: crudServiceBaseUrl  + '/UserProgramRight.ashx?action=BY_ACCESS&userid='+window.params.USERID,
					dataType: "json"
				},
				create: {
					url: crudServiceBaseUrl  + '/UserRights.ashx?action=SAVE',
					dataType: "json"
				},
				update: {
					url: crudServiceBaseUrl  + '/UserRights.ashx?action=UPDATE',
					dataType: "json"
				},
				destroy: {
					url: crudServiceBaseUrl  + '/UserRights.ashx?action=DELETE',
					dataType: "json"
				},
				parameterMap: function(options, operation) {
					var data = {};
					var url = {};

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
				// bootbox.alert(e.xhr.responseText);
			},
			batch: true,
			schema: {
				model: {
					id: "PROGID",
					fields: {
						USERID: { type: "string", validation: { required: true } },
						PROGID: { type: "string", validation: { required: true } },
						PROGNAME: { type: "string", validation: { required: true } },
						MAINPROGRAM: { type: "string", validation: { required: true } },
					}
				}
			}
	});
	displayLoading($('body'));
	$("#grid").kendoGrid({
			dataSource: dataSource,
			height: $(document).height()-100,
		  persistSelection: true,
			columns: [
				{ 
					headerTemplate: `<input type="checkbox" class="checkall" onchange="checkall(this)" />`,
					template: `<input type="checkbox" data-rowid="#:uid#" onchange="checkme(this)" />`,
					 width: "60px" },
				{
					field: "PROGNAME",
					title: "MODULE NAME",
					width: "280px"
				},
				{
					field: "MAINPROGRAM",
					title: "MAINPROGRAM",
					width: "150px",
					hidden:true
				},
				{
					field: "PROGID",
					title: "PROG ID",
					width: "80px",
					hidden:true
				},
				{
					field: "USERID",
					title: "",
					width: "50px",
					hidden:true
				},
			],
		  dataBound: function(e) {
			  var grid = this;
			  $.each(grid.tbody.find('tr'), function() {
				  var model = grid.dataItem(this);
				  if(model.PROGNAME.toUpperCase()=="ACCOUNTING" || model.PROGNAME.toUpperCase()=="INVENTORY" || model.PROGNAME.toUpperCase()=="OTHER MODULES" || model.PROGNAME.toUpperCase()=="REPORTS" || model.PROGNAME.toUpperCase()=="FILE MAINTENANCE" || model.PROGNAME.toUpperCase()=="TRANSACTION"){
					// change color based on STATUS
					$('[data-uid=' + model.uid + ']').addClass('status');
				  }
			  });
				var userid = window.params.USERID;
				loadrights(userid);
				// hideLoading($('body'));
			},
	});
}

function checkall(p) {
	var toggle = $(p).is(':checked');
	var checkboxes = $('.k-grid').find('input[type^="checkbox"]');
	checkboxes.prop('checked', toggle);
	if (toggle) {
		var grid = $('#grid').data('kendoGrid');
		var checked_items = [];
		if($('#search').val()!==''){
			checked_items = store.get('checked_items');
		}
		$.each(checkboxes, function(k, v) {
			var row = $(v).closest('tr');
			var dataitem = grid.dataItem(row);
			checked_items.push(dataitem);
		});
		store.set('checked_items', checked_items);
	} else {
		store.set('checked_items', []);
	}
}

function checkme(p) {
	var ischecked = $(p).is(':checked');
	// var rowid = $(p).attr('data-rowid');
	var row = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var gcontent = grid.tbody.find('.k-grid-content');
	gcontent.find(row).addClass('k-selected');
	var dataitem = grid.dataItem(row);
	var checked_items = store.get('checked_items');
	if(ischecked){
		checked_items.push(dataitem);
	}else{
		$.each(checked_items,function(k,v){
			if(dataitem	!== undefined && v!==undefined){
			if(v.PROGID==dataitem.PROGID){
				checked_items.splice(k,1);
				return;
			}
		}
		});
	}
	store.set('checked_items', checked_items);
}

function loadrights(userid) {
	$.get(global_config.systemapi_url + '/UserRights.ashx?action=BY_USERID&USERID='+userid).always(function(data) {
		hideLoading($('body'));
		var grid = $('#grid').data('kendoGrid');
		var checkboxes = $('.k-grid').find('input[type^="checkbox"]');
		var checked_items = store.get('checked_items');
		if(checked_items.length==0){
			store.set('checked_items',data);
			checked_items = data;
		}
		$.each(checked_items, function(k1, v1) {
			$.each(checkboxes, function(k, v) {
				var row = $(v).closest('tr');
				var dataitem = grid.dataItem(row);
				if (dataitem.PROGID == v1.PROGID) {
					$(v).prop('checked', true);
				}
			});
			if(k1 == checked_items.length-1){
				if(checked_items.length==checkboxes.length-1){
					$('.checkall').prop('checked', true);
				}else{
					$('.checkall').prop('checked', false);
				}
			}
		});

	});
}

function saverights() {
	// var grid = $('#grid').data('kendoGrid');
	
	// // array to store the dataItems
	// var selected = [];
	// //get all selected rows (those which have the checkbox checked)  
	// grid.select().each(function(){
	// 		var dataItem = grid.dataItem(this);
	// 		// overwrite userid
	// 		dataItem.USERID = window.params.USERID;
	// 		//push the dataItem into the array
	// 		selected.push(dataItem);
	// });
	var params = {
		models: kendo.stringify(store.get('checked_items'))
	};
  
	$.post(global_config.systemapi_url + '/UserRights.ashx?action=SAVE&userid='+window.params.USERID, params).always(function(data) {
		
		bootbox.alert("User rights saved!",function(){
			location.reload();
		});
	});
}

function searching() {
	
	$('#search').on('input', function(e) {
		var grid = $('#grid').data('kendoGrid');
		var columns = grid.columns;
	
		var filter = {
		  logic: 'or',
		  filters: []
		};
		columns.forEach(function(x) {
		  if (x.field) {
			var type = grid.dataSource.options.schema.model.fields[x.field].type;
			filter.filters.push({
			  field: x.field,
			  operator: 'contains',
			  value: e.target.value
			})
		  }
		});
		grid.dataSource.filter(filter);
	  });
	// $('#search').on('input', function(e) {
	// 	var grid = $('#grid').data('kendoGrid');
	// 	var columns = grid.columns;

	// 	var filter = {
	// 		logic: 'or',
	// 		filters: []
	// 	};
	// 	columns.forEach(function(x) {
	// 		if (x.field) {
	// 			var type = grid.dataSource.options.schema.model.fields[x.field].type;
	// 			if (type == 'string') {
	// 				filter.filters.push({
	// 					field: x.field,
	// 					operator: 'contains',
	// 					value: e.target.value
	// 				})
	// 			} else if (type == 'number') {
	// 				if (isNumeric(e.target.value)) {
	// 					filter.filters.push({
	// 						field: x.field,
	// 						operator: 'eq',
	// 						value: e.target.value
	// 					});
	// 				}

	// 			} else if (type == 'date') {
	// 				var data = grid.dataSource.data();
	// 				for (var i = 0; i < data.length; i++) {
	// 					var dateStr = kendo.format(x.format, data[i][x.field]);
	// 					if (dateStr.startsWith(e.target.value)) {
	// 						filter.filters.push({
	// 							field: x.field,
	// 							operator: 'eq',
	// 							value: data[i][x.field]
	// 						})
	// 					}
	// 				}
	// 			} else if (type == 'boolean' && getBoolean(e.target.value) !== null) {
	// 				var bool = getBoolean(e.target.value);
	// 				filter.filters.push({
	// 					field: x.field,
	// 					operator: 'eq',
	// 					value: bool
	// 				});
	// 			}
	// 		}
	// 	});
	// 	grid.dataSource.filter(filter);
	// });
}


// Main Entry
$(document).ready(function() {
	store.set('checked_items',[]);
  	process();
	searching();
});

