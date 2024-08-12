function view_image(p){
    var refno = $(p).attr('refno');
    
	dynamicWin("view_image", "", 'galery.asp?refno='+refno,200,"max", true);
}
function listgrid(){
    $('#accidents').empty();
    var mysession = deserialize(Cookies.get(global_config.cookie));
    $.get(global_config.acctg_api_url + "/Accidents.ashx?action=BY_STATUS&id=RECEIVED").always(function(data){
        var html = '';
        if(data.length ==0){
            html = '<br><h2>No record(s) available<h2>';
        }
        $.each(data,function(k,v){
            html +='<div class="d-flex align-items-center mb-5">';
            html +='<div class="col-lg-6">';
            html +='<div class="row">';

            if(v.FILENAME){
                var arr = v.FILENAME.split(',');
                var x = 0;
                arr.forEach(function(filePath) {
                    x = x+1;
                    filePath =filePath.replace(/ /g, '');
    
                    if(arr.length<=1){
                        html +='<div class="row" refno="'+v.REFNO+'" onclick="view_image(this)">';
                        var imgpath = 'client_uploads/files/ACCIDENTS/'+v.REFNO+'/'+v.FILENAME2+'?t='+Math.random();
                           var noimgpath = 'resources/no-image.png';
                           html += `<img class="k-card-image img-thumbnail one" src="` + imgpath + `" onerror="this.onerror=null;this.src='` + noimgpath + `';"/>`;
                           html +='</div>';
                    }else if(arr.length>3){
                        if(x<=4){
                            html +='<div class="col-lg-6" refno="'+v.REFNO+'" onclick="view_image(this)">';
                            var imgpath = 'client_uploads/files/ACCIDENTS/'+v.REFNO+'/'+filePath+'?t='+Math.random();
                               var noimgpath = 'resources/no-image.png';
                               html += `<img class="imgsp" src="` + imgpath + `" onerror="this.onerror=null;this.src='` + noimgpath + `';"/>`;
                            html +='</div>';
                        }
                        // else if(x==4){
                        //     html +='<div class="col-lg-6" refno="'+v.REFNO+'" onclick="view_image(this)">';
                        //     html +='<button class="btn btn-more" type="button">See More</button>';                            
                        //     html +='</div>';                            
                        // }

                    }else{
                        html +='<div class="col-lg-6" refno="'+v.REFNO+'" onclick="view_image(this)">';
                        var imgpath = 'client_uploads/files/ACCIDENTS/'+v.REFNO+'/'+filePath+'?t='+Math.random();
                           var noimgpath = 'resources/no-image.png';
                           html += `<img class="k-card-image img-thumbnail one" src="` + imgpath + `" onerror="this.onerror=null;this.src='` + noimgpath + `';"/>`;
                        html +='</div>';
                    }
                });
            }

            html +='</div>';
            html +='</div>';
            html +='<div class="col-lg-6">';
            html +='<div class="col-xxl-12">';
            html +='<div class="card shadow-sm">';
            html +='<div class="card-header">';
            html +='<div class="col-lg-7">';
            html +='<div class="card-title" style="padding:10px;"> <span style="padding:10px; background:#FFA6A5; width:50%; text-align:center" >'+v.PRIO_DESC+'</span></div>';
            html +='</div>';
            html +='<div class="col-lg-2" style="padding:20px">';
            html +='<h3 class="card-title" style="color:#FA504D">'+v.CCTV_CODE+'</h3>';
            html +='</div>';
            html +='<div class="col-lg-2" style="padding:20px">';
            html +='<h3 class="card-title" style="color:#FA504D">'+moment(v.TRANDATE).format('MM/DD/YYYY HH:mm:ss')+'</h3>';
            html +='</div>';
            html +='<div class="card-toolbar">';
            html +='</div>';
            html +='</div>';
            html +='<div class="card-body">';
            html +='<div class="d-flex align-items-center mb-5">';
            html +='<div class="col-lg-6">';
            html +='<h3 class="ttype">Accident Location:</h3>';
            html +='</div>';
            html +='<div class="col-lg-6">';
            html +='<h5 class="ttype" style="color:gray">'+v.CCTV_DESCRIPTION+'</h5>';
            html +='</div>';
            html +='</div>';
            html +='<div class="mb-5">';
            html +='<div class="d-flex align-items-center mb-5">';
            html +='<div class="col-lg-12">';
            html +='<a href="recommendation.asp?refno='+v.REFNO+'&cctv='+v.CCTV_CODE+'" type="button" class="btn btn-primary btn-block" style="width:100%" onclick="change_status(this)"> Recommendation</a>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='<br/>';
        });
        $('#accidents').append(html);
    });
  }

  function recordChecker(){
    $.get(global_config.acctg_api_url + "/Accidents.ashx?action=BY_STATUS&id=PENDING").always(function(data){
        if(data.length>0){
            listgrid();
        }
    });

  }

$(document).ready(function(){
    listgrid();
    setInterval(recordChecker, 5000);
  });