function select_item(p){
  var imgpath = $(p).attr('imgpath');
	var winsize = {
		h: 360,
		w: 300
	}
  if(!isOnMobile()){
    winsize = {
      h: 760,
      w: 700
    }
  }
	dynamicWin("viewphoto", "", imgpath, winsize, null, true);
}
function galery_listing() {
  var refno = window.params.refno;
  var url = global_config.systemapi_url + "/GetAllFiles.ashx?action=ACCIDENTS&module_code=ACCIDENTS&refno="+refno;
  displayLoading($('body'));
  $('#galery_list').empty();
  $.getJSON(url).always(function(data) {
    if (typeof data !== 'undefined') {
      var html = '';
      $.each(data, function(k, v) {
        var imgpath = 'client_uploads/files/ACCIDENTS/'+v.refno+'/'+v.file_name;
        html += '<div class="col-lg-2  col-md-6 col-xs-12" style="padding:10px">';
        html += '<div class="k-card" data-id="'+v.ID+'" imgpath="'+imgpath+'" onclick="select_item(this)">';
        html += '<div class="k-card-body">';
        html += '<div class="col-lg-12">';
        var noimgpath = 'resources/no-image.png';
        html += `<img class="k-card-image img-thumbnail menu-photo" src="` + imgpath + `" onerror="this.onerror=null;this.src='` + noimgpath + `';" />`;
        html += '</div>';
        html += '<div class="col-lg-12">';
        html += '<label><strong>' + v.file_name + '</strong></label><br>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      });
      $('#galery_list').append(html);
    }
    hideLoading($('body'));
  });
}
// Main entry (Form Load)
$(document).ready(function() {  
	galery_listing(); 
}); 