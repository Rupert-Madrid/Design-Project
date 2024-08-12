global_config.global_progname = 'CCTV FILE';
function addrecord() {
	$('#filter').val('');
	$('#filter').trigger('input')
	var grid = $("#grid").data("kendoGrid");
  setTimeout(function() {
    grid.addRow();
  }, 100);
}

function assignHotline(p) {
	var element = $(p).closest('tr');
	var grid = $('#grid').data('kendoGrid');
	var dataItem = grid.dataItem(element);
	var winsize = {
		h: 400,
		w: 800
	}
	dynamicWin("bundlelist", "Bundle List for "+ dataItem.CCTV_CODE, 'bundlelist.asp?cctv='+dataItem.CCTV_CODE,100, "max", true);
}

// Main entry
$(document).ready(function () {
	store.set('prev_menu','file_maintenance.asp');
  var crudServiceBaseUrl = global_config.acctg_api_url;
  var dataSource = new kendo.data.DataSource({
          transport: {
              read:  {
                  url: crudServiceBaseUrl + "/CCTVFile.ashx?action=ALL",
                  dataType: "json"
              },
              update: {
                  url: crudServiceBaseUrl + "/CCTVFile.ashx?action=UPDATE",
                  dataType: "json"
              },
              destroy: {
                  url: crudServiceBaseUrl + "/CCTVFile.ashx?action=DELETE",
                  dataType: "json"
              },
              create: {
                  url: crudServiceBaseUrl + "/CCTVFile.ashx?action=SAVE",
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
                  id: "CCTV_CODE",
                  fields: {
                    CCTV_CODE: {validation: { required: true }},
                    CCTV_DESCRIPTION: { validation: { required: true } }
                  }
              }
          }
  });

  $("#grid").kendoGrid({
      dataSource: dataSource,
      sortable: true,
      height: $(document).height()-305,
      columns: [
          { field:"CCTV_CODE", title: "Code", width: "170px" },
          { field:"CCTV_DESCRIPTION", title: "Description", width: "270px" },
          { field:"REMARKS", title: "Remarks", width: "270px" },
          {
            name: "selectitem",
            template: `
                <a class='btn btn-light btn-sm customEdit' title='Edit Page'><span class='fa fa-edit'></span></a>
                <a class='btn btn-light btn-sm customDelete' title='Delete Page'><span class='fa fa-trash'></span></a>
                <a class='btn btn-light btn-sm' title='Assign Hotline' onclick="assignHotline(this)"><span class='fa fa-eye'></span></a>
                `,
            title: "Actions",
            width: "100px",
            attributes: {
              class: "text-center"
            }
          }
        ],
        editable: {
          mode: "popup",
          window: {
            title: "CCTV File",
            animation: false,
            width: "450px",
            height: "190px"
          }
        },
    edit: function(e) {
      e.container.find(".k-edit-label:last").hide();
      e.container.find(".k-edit-field:last").hide();
        if (e.model.isNew() === false) {
          e.container.find("input[name=CCTV_CODE]").css({ "background-color": "lightgray" });
          e.container.find("input[name=CCTV_CODE]").attr("readonly", true);
        }
      },
  });

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