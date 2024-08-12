function select_item(p) {
	var browse_only = window.params.browse_only;
	if(browse_only=="true" && browse_only !==undefined){
		return false;
	}
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);

	var additional = store.get('additional');
	if ($('[data-uid=' + dataItem.uid + ']').hasClass('status') == true && additional !== true) {
			// bootbox.alert('No Record Duplication');
			// return false;
		var grid = window.parent.$('#grid').data('kendoGrid');
		$.each(grid.tbody.find('tr'), function() {
			var model = grid.dataItem(this);
			if(model!==undefined){
				if(model.HOTLINE_CODE==dataItem.HOTLINE_CODE){
					grid.dataSource.remove(grid.dataItem(this));
				}
			}
		});
		$('[data-uid=' + dataItem.uid + ']').removeClass('status');
		return;
	} 
	$('[data-uid=' + dataItem.uid + ']').addClass('status');
	store.set('itemselected', dataItem);
	if (store.get("browse_type") == "single") {
		store.remove('browse_type');
		dynamicWinClose("browseproduct", "browseproductclose");
	} else {
		window.parent.$('body').trigger('multibrowseproductclose')
	}

}
function listgrid(){
	$('#grid').empty();  
	var crudServiceBaseUrl = global_config.acctg_api_url;
	var dataSource = new kendo.data.DataSource({
			transport: {
				read:  {
					url: crudServiceBaseUrl + "/HotlineFile.ashx?action=ALL",
					dataType: "json"
				},
				parameterMap: function(options, operation) {
					if (operation !== "read" && options.models) {
						return {models: kendo.stringify(options.models)};
					}
				}
			},
			error: function(e) {
			  if (e.xhr.responseText.startsWith("saved")) {
				alert('Record saved!');
				location.reload();
			  }
			  if (e.xhr.responseText.startsWith("deleted")) {
				alert('Record deleted!');
				location.reload();
			  }
			  if (e.xhr.responseText.startsWith("updated")) {
				alert('Record updated!');
				location.reload();
			  }
			  if (e.xhr.responseText.startsWith("error:")) {
				alert(e.xhr.responseText);
			  }
			},
			batch: true,
  //           pageSize: 20,
			schema: {
				model: {
					id: "HOTLINE_CODE",
					fields: {
					  HOTLINE_CODE: {validation: { required: true }},
					  HOTLINE_DESCRIPTION: { validation: { required: true } }
					}
				}
			}
	});
  
	$("#grid").kendoGrid({
		dataSource: dataSource,
		sortable: true,
		height: $(document).height()-305,
		columns: [
			{ field:"HOTLINE_CODE", title: "Code", width: "170px" },
			{ field:"HOTLINE_DESCRIPTION", title: "Description", width: "270px" },
			{ field:"HOTLINE_TYPE", title: "Type", width: "170px" },
			{ field:"HOTLINE_NUMBER", title: "Hotline", width: "170px" },
			{
				name: "selectitem",
				template: "<button class='k-button' onclick='select_item(this)'>Select</button>",
				title: "Action",
				width: "150px",
				attributes: {
					class: "text-center"
				}
				
			}
		  ]
	});
}

// Main entry (Form Load)
$(document).ready(function() {
	listgrid();
	
	$('#filter').on('input', function(e) {
		var grid = $('#grid').data('kendoGrid');
		var columns = grid.columns;
	
		var filter = {
		  logic: 'or',
		  filters: []
		};
		columns.forEach(function(x) {
		  if (x.field) {
			filter.filters.push({
			  field: x.field,
			  operator: 'contains',
			  value: e.target.value
			})
		  }
		});
		grid.dataSource.filter(filter);
	  });

	  
}); 