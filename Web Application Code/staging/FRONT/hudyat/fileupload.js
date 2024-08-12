// whitelists
var allowable_files = [ ".jpg", ".jpeg",".png", ".xps", ".pdf", ".txt", ".xlsx", ".xls",".ppt",".pptx", ".doc", ".docx" ];
var kendo_settings = {};
var ismultiple = false;
// check what kind of Uploading Single or Multiple
if (typeof window.params.multiple !== "undefined") {
	ismultiple = window.params.multiple;
}

kendo_settings = {
		multiple: ismultiple,
	  chunkSize: 11000, // bytes
	  autoUpload: true,
		autoRetryAfter: 300, // Will attempt a failed chunk upload after 300ms.
		maxAutoRetries: 4, // Will attempt the same failed chunk upload 4 times.
		validation: {
				allowedExtensions: allowable_files,
				maxFileSize: 10485760,
				minFileSize: 1024
		},
		showFileList: false,
		dropZone: ".dropZoneElement",
		async: {
				saveUrl: global_config.systemapi_url + "/UploadFile.ashx"
		},
		upload: function(e) {
				// An array with information about the uploaded files
				var files = e.files;
				var ext = '';

				// Checks the extension of each file and aborts the upload if it is not .jpg
				$.each(files, function () {
						ext = this.extension.toLowerCase();
						if (allowable_files.indexOf(ext) === -1) {
							bootbox.alert('Selected files Invalid! Server only allow files that has following format ".jpg", ".jpeg",".png", ".xps", ".pdf", ".txt", ".xlsx", ".xls", ".doc", ".docx"');
							e.preventDefault();	
						}
				});

				// add extra parameters
				e.data = { module_code: $("#module_code").val(), refno: $("#refno").val() };
		}
};
$("#myfiles").kendoUpload(kendo_settings);

$('#uploadmode').text((ismultiple) ? "(Multiple Selection)" : "(Single Selection)");