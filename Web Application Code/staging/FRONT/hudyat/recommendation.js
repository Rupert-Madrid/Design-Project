function view_image(p){
    var refno = $(p).attr('refno');
    
	dynamicWin("view_image", "", 'galery.asp?refno='+refno,200,"max", true);
}

function moreItem(p){
    var hotline_type = $(p).attr('type');
    if($('.more_'+hotline_type).attr('class').indexOf('hide')>=0){
        $('.more_'+hotline_type).removeClass('hide');
        $(p).text('LESS');
    }else{
    $('.more_'+hotline_type).addClass('hide');
    $(p).text('MORE');
    }
}
function change_status(){
	bootbox.prompt({
		title: "Enter Remarks",
		inputType: 'text',
		callback: function(remarks) {
			if (remarks) {
                var checkedBoxes = document.querySelectorAll('input[name=hotline]:checked');
                var combinedValues = Array.from(checkedBoxes).map(box => box.value).join(', ');

                bootbox.prompt({
                    title: "Enter pincode to proceed",
                    inputType: 'password',
                    callback: function(inputpassword) {
                        if (inputpassword) {
                            var access_params = {
                            callback: 'none',
                            action: 'PINCODE',
                            pincode: inputpassword
                            };
                            $.post(global_config.systemapi_url + '/AccessPermission.ashx', access_params).always(function(data) {
                            var user = data[0];
                            if(data.length <=0){
                                bootbox.alert('Access Denied');
                                return;
                            }
                            var params ={
                                REMARKS:remarks,
                                HOTLINE:combinedValues,
                                REFNO: window.params.refno,
                                STATUS:"CLOSED"
                            }
                            $.post(global_config.acctg_api_url + '/Accidents.ashx?action=UPDATE_STATUS&user=' + user.UserName,params).always(function(data) {
                                if(data=="saved"){
                                    bootbox.alert('Action Confirmed', function(){
                                        window.location = "monitor.asp";
                                    });
                                }else{
                                    bootbox.alert(data);
                                }
            
                            });
                            });
                        }
                    }
                });
            }
        }
    });
}

function listgrid(){
    $('#accidents').empty();
    $('#hotline').empty();
    var mysession = deserialize(Cookies.get(global_config.cookie));
    var remarks = '';
    var assessment = '';
    $.get(global_config.acctg_api_url + "/Accidents.ashx?action=BY_ID&id="+window.params.refno).always(function(data){
        var html = '';
        if(data.length ==0){
            html = '<br><h2>No record(s) available<h2>';
        }
        $.each(data,function(k,v){
            
            html +='<div class="col-xxl-12"  style="padding:50px;">';
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
            html +='<div class="d-flex align-items-center mb-5"  style="margin:0 auto;">';
            html +='<div class="col-lg-12" style="padding:30px" refno="'+v.REFNO+'" onclick="view_image(this)">';
            var imgpath = 'client_uploads/files/ACCIDENTS/'+v.REFNO+'/'+v.FILENAME+'?t='+Math.random();
               var noimgpath = 'resources/no-image.png';
               html += `<img class="k-card-image img-thumbnail" src="` + imgpath + `" onerror="this.onerror=null;this.src='` + noimgpath + `';" />`;
            html +='</div>';
            html +='</div>';
            if(window.params.action !== 'history'){
                html +='<div class="mb-5">';
                html +='<div class="d-flex align-items-center mb-5">';
                html +='<div class="col-lg-12">';
                html +='<a href="#!" type="button" class="btn btn-primary btn-block" style="width:100%" onclick="change_status()"> Confirm Response</a>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
            }

            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='</div>';
            html +='<br/>';
            remarks = v.HOTLINE;
            assessment = v.POSTASSESSMENT;
            
        });
            $('#accidents').append(html);
            
    var support = [
        {
            HOTLINE_TYPE:"AMBULANCE"
        },
        {
            HOTLINE_TYPE:"BARANGAY"
        },
        {
            HOTLINE_TYPE:"PNP"
        },
        {
            HOTLINE_TYPE:"BFP"
        }
    ];

    if(window.params.action !== 'history'){
        $.each(support, function(key,val){
            
            $.get(global_config.acctg_api_url + "/NearHotline.ashx?action=BY_ID&id="+window.params.cctv + "&type="+val.HOTLINE_TYPE).always(function(data2){
                var html = '';
                html +='<div class="col-lg-12"  style="padding:30px">';
                html +='<div class="col-xxl-12">';
                html +='<div class="card shadow-sm">';
                html +='<div class="card-header">';
                html +='<h3 class="card-title">CALL '+val.HOTLINE_TYPE+'</h3>';
                // html +='<div class="card-toolbar">';
                // html +='<a href="#!"  class="justify-content-end" style="color:black; background:#E88B8C; padding:5px; pointer:cursor;" type="'+val.HOTLINE_TYPE+'" onclick="moreItem(this)">';
                // html +='<span> MORE';
                // html +='</span>';
                // html +='</a>';
                // html +='</div>';
                html +='</div>';
                html +='<div class="card-body">';
                html +='<h3 class="ttype"> Nearest '+val.HOTLINE_TYPE+': </h3>';
                $.each(data2,function(k1,v1){
                    html +='<h5 class="first" style="color:gray"><input type="checkbox" name="hotline" value="'+v1.HOTLINE_DESCRIPTION + ' ' + v1.HOTLINE_NUMBER+'"> ' + v1.HOTLINE_DESCRIPTION + ' ' +v1.HOTLINE_NUMBER+'</h5>';
                    // if(k1==0){
                    //     html +='<h5 class="first" style="color:gray">' + v1.HOTLINE_DESCRIPTION + ' ' +v1.HOTLINE_NUMBER+'</h5>';
                    // }else{
                    // html +='<h5 class="more_'+val.HOTLINE_TYPE+' hide" style="color:gray">' + v1.HOTLINE_DESCRIPTION + ' ' +v1.HOTLINE_NUMBER+'</h5>';
                    // }
                });
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
    
                $('#hotline').append(html);
            });
    
        });

    }else{
        var html = '';
        html +='<div class="col-xxl-12"  style="padding:50px; padding-bottom:0px">';
        html +='<div class="col-xxl-12">';
        html +='<div class="card shadow-sm">';
        html +='<div class="card-header">';
        html +='<h3 class="card-title">HOTLINE</h3>';
        html +='</div>';
        html +='<div class="card-body">';
        html +='<h5 class="first" style="color:gray">' + remarks +'</h5>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';

        
        html +='<div class="col-xxl-12"  style="padding:50px;">';
        html +='<div class="col-xxl-12">';
        html +='<div class="card shadow-sm">';
        html +='<div class="card-header">';
        html +='<h3 class="card-title">POST ASSESSMENT</h3>';
        html +='</div>';
        html +='<div class="card-body">';
        html +='<h5 class="first" style="color:gray">' + assessment +'</h5>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';
        html +='</div>';

        $('#hotline').append(html);


    }

    });
    

  }

  
$(document).ready(function(){
    listgrid();
  });