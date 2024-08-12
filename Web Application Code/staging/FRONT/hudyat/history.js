global_config.global_progname = 'CCTV FILE';

function dropdownEditor(container, options) {
  if (options.field === "POSTASSESSMENT") {
    $('<input name="' + options.field + '"/>')
      .appendTo(container)
      .kendoDropDownList({
        valuePrimitive: true,
        autoBind: false,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
      {
            text: " ",
            value: " "
          },
          {
            text: "Fatal",
            value: "Fatal"
          },
          {
            text: "Non-Fatal",
            value: "Non-Fatal"
          },
          {
            text: "Damage to Property",
            value: "Damage to Property"
          },
        ]
      });
  }
}

function listgrid(){
  
  var crudServiceBaseUrl = global_config.acctg_api_url;
  var dataSource = new kendo.data.DataSource({
          transport: {
              read:  {
                  url: crudServiceBaseUrl + "/Accidents.ashx?action=BY_STATUS&id=CLOSED",
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
                    CCTV_CODE: {validation: { required: true }, editable:false},
                    CCTV_DESCRIPTION: { validation: { required: true }, editable:false },
                    REFNO:{editable:false},
                    STATUS:{editable:false},
                    TRANDATE:{editable:false},
                    HOTLINE:{editable:false},
                    REMARKS:{editable:false},
                    RESPONSEDATE:{editable:false}
                    
                  }
              }
          }
  });

  $("#grid").kendoGrid({
      dataSource: dataSource,
      sortable: true,
      height: $(document).height()-305,
      columns: [
          { field:"CCTV_CODE", title: "CCTV", width: "170px" },
          { field:"CCTV_DESCRIPTION", title: "Location", width: "270px" },
          { field:"REFNO", title: "Code", width: "170px" },
          { field:"STATUS", title: "Status", width: "170px" },
          { field:"TRANDATE", title: "Date", width: "170px" , template: "#= kendo.toString(kendo.parseDate(TRANDATE), 'MM/dd/yyyy HH:mm:ss') #"},
          { field:"HOTLINE", title: "Hotline", width: "270px" },
          { field:"REMARKS", title: "Remarks", width: "270px" },
          { field:"RESPONSEDATE", title: "Response Time", width: "170px" , template: "#= kendo.toString(kendo.parseDate(RESPONSEDATE), 'MM/dd/yyyy HH:mm:ss') #"},
          { field:"POSTASSESSMENT", title: "Post Assessment", width: "270px",editor:dropdownEditor },
          {
            name: "selectitem",
            template: `
                <a class='btn btn-light btn-sm' title='Assign Hotline' href="recommendation.asp?action=history&refno=#=REFNO#&cctv=#=CCTV_CODE#" ><span class='fa fa-eye'></span></a>
                `,
            title: "Details",
            width: "100px",
            attributes: {
              class: "text-center"
            }
          }
        ],
        editable: true,
        cellClose: function(e){
          var grid = this;
          var item = grid.dataItem(grid.tbody.find("tr[data-uid='" + e.model.uid + "']").select());
          if(item !== undefined && item !== null){
            var mysession = deserialize(Cookies.get(global_config.cookie));
            var params = {
              REFNO:item.REFNO,
              POSTASSESSMENT:item.POSTASSESSMENT
            }
            debugger  
            $.post(global_config.acctg_api_url + '/Accidents.ashx?action=UPDATE_ASSESSMENT',params).always(function(data) {
              listgrid();
            });
          }
        },
  });

}

// Main entry
$(document).ready(function () {
	store.set('prev_menu','file_maintenance.asp');
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