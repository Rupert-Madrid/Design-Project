var global_module_code ='BUNDLE LIST';

//save product
function product_save() {
	var cctv = window.params.cctv
  var mysession = deserialize(Cookies.get(global_config.cookie));
  bootbox.confirm({
    title: "SAVE Bundle for "+cctv,
    message: "Are you sure you want to proceed?",
    buttons: {
      cancel: {
        label: '<i class="fa fa-times"></i> CANCEL'
      },
      confirm: {
        label: '<i class="fa fa-check"></i> SAVE'
      }
    },
    callback: function(result) {
      if (result === true) {
		var grid = $('#grid').data('kendoGrid');
		var product_grid = grid.dataSource.view();
		var params = {
			"grid": kendo.stringify(product_grid)
		}
		displayLoading($('body'));
		$.post(global_config.acctg_api_url + '/NearHotline.ashx?action=SAVE&criteria=all&username='+mysession.user_name+'&id='+cctv, params).always(function(data) {
			hideLoading($('body'));
		   if(data=="saved"){
					  bootbox.alert("Transaction Saved", function() {
						 listgrid();
		  });
		  }else{
		  bootbox.alert(data);
		  }
		});
      }
    }
  });
}
function editNumber(container, options) {
$('<input data-bind="value:' + options.field + '"/>')
	.appendTo(container)
	.kendoNumericTextBox({
		spinners: false,
		step:0,
		decimals:4
	});
}
//DELETE
function delete_tran(p) {
	var grid = $('#grid').data('kendoGrid');
	grid.select(grid.tbody.find("tr[data-uid='" + $(p).attr('id') + "']"));
	var item = grid.dataItem(grid.select());
	if (grid.dataSource.data().length > 0  ) {
		grid.select().each(function() {
			//DELETE THE SELECTED ITEM
			grid.dataSource.remove(grid.dataItem($(this).closest("tr")));
		});
	}
}
function listgrid(p){
	var cctv = window.params.cctv;
	//P IS FOR EDITABLE OR NOT EDITABLE
	var disabled='';
	if (p == false) {
		disabled = "hide";
	} else {
		disabled = "";
	}
var crudServiceBaseUrl = global_config.acctg_api_url;

	//sales order  DATA SOURCE
	var dataSource = new kendo.data.DataSource({
		transport: {
			read: {
				url: crudServiceBaseUrl + "/NearHotline.ashx?action=BY_ID&id=" + cctv + "&type=ALL",
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
				id: "HOTLINE_CODE",
				fields: {
					HOTLINE_CODE: {}
				}
			}
		}
	});

	var grid = $("#grid").kendoGrid({
		dataSource: dataSource,
		selectable: "row",
		// navigatable: true,
		editable: true,
		resizable: true,
		height: $(document).height()-100,
		columns: [
		{ 
			field:"HOTLINE_CODE", 
			title: "Hotline", 
			width:"150px"
		},
		{ 
			field:"HOTLINE_DESCRIPTION", 
			title: "Description", 
			width:"150px"
		},
		{
			title: "Actions",
			name: "deleteitem",
			template: "<button class='btn btn-light btn-sm "+disabled+"'  type='button' id='${ uid }' onclick='delete_tran(this)' title='Delete Record'><i class='fa fa-trash'></i></button>",
			width:"90px"
		},
		],
		edit: function(e) {
			e.container.find("input[name=HOTLINE_CODE]").attr("readonly", true);
		},
		cellClose: function(e){
			var grid = this;
		},
		dataBound: function() {
			var grid = this;
		}

	}).data('kendoGrid');
}

// Main entry
$(document).ready(function() {
  listgrid();
	store.remove('gridname');
  $('#btnsave').click(function() {
	product_save();
  });
  $('#product_browse').click(function(){
	  var url = global_config.main_url + global_config.main_program_folder + '/hotline_browse.asp';
	  dynamicWin("hotline_browse", "Hotline Browsing", url, 100, "max", true);
  });
  // Browsing multiple product click
  $('body').on('multibrowseproductclose', function() {
	  //LINE browsing
  var line = $('#grid').data('kendoGrid').dataSource.total() + 1;
	  var itemselected = store.get('itemselected');
	  var params = {
		  HOTLINE_CODE: itemselected.HOTLINE_CODE
	  }
	  $('#grid').data().kendoGrid.dataSource.add(params);
  });
});