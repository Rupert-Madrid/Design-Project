function date_listing(start_date,end_date){

    $('#dates').empty();
    var date_html = '';
    while(start_date<=end_date){
        var current_date = '';
        if(moment(start_date).format('MM/DD/YYYY') == moment(store.get('date_selected')).format('MM/DD/YYYY')){
            current_date = 'active';
        }
        date_html +='<li class="nav-item me-1" role="presentation">';
        date_html +='<a class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary '+current_date+'" id="'+moment(start_date).format('MMDDYYYY')+'" onclick="date_selected('+start_date+')">';
        date_html +='<span class="opacity-50 fs-7 fw-semibold">'+moment(start_date).format('MMM')+'</span>';
        date_html +='<span class="opacity-50 fs-7 fw-semibold">'+moment(start_date).format('ddd')+'</span>';
        date_html +='<span class="fs-6 fw-bold">'+moment(start_date).format('DD')+'</span>';
        date_html +='</a>';
        date_html +='</li>';
        start_date = moment(start_date).add(1, 'days');
    }
    $('#dates').append(date_html);

}

function date_selected(current_date){
    $('.nav-link').removeClass('active');
    $('#'+moment(current_date).format('MMDDYYYY')).addClass('active');
    store.set('date_selected',current_date);
    listgrid();
}

function date_adjustment(sign){
    var start_date = store.get('start_date');
    var end_date = store.get('end_date');
    if(sign == '-'){
        start_date = moment(start_date).add(-1, 'days');
        end_date = moment(end_date).add(-1, 'days');
    }else{
        start_date = moment(start_date).add(1, 'days');
        end_date = moment(end_date).add(1, 'days');
    }
    store.set('start_date',start_date);
    store.set('end_date',end_date);
    date_listing(start_date,end_date);
}

function listgrid(){
    $('#lessons').empty();
        var status = window.params.status;
        var current_date = store.get('date_selected');
        var mysession = deserialize(Cookies.get(global_config.cookie));
        $.get(global_config.lesson_api_url + "/LessonPlan.ashx?action=BY_STATUS&email="+mysession.email+"&status="+status+"&criteria="+moment(current_date).format('MM/DD/YYYY')).always(function(data){
            var html = '';
            if(data.length ==0){
                html = '<br><h2>No record(s) available<h2>';
            }
            $.each(data,function(k,v){
                
                html +='<div class="col-md-6 col-lg-6 col-xl-6">';
                html +='<div class="card shadow-sm" style="background:#E6E8FA; color:#858FE9 ">';
                html +='<div class="card-header">';
                html +='<h3 class="card-title">'+v.COURSE_CODE+'</h3>';
                html +='<div class="card-toolbar">';
                html +='<a href="lesson_plan.asp?plan_code='+v.PLAN_CODE+'" class="btn btn-icon btn-color-gray-400 btn-active-color-primary justify-content-end">';
                html +='<span class="svg-icon svg-icon-1">';
                html +='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">';
                html +='<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />';
                html +='<rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />';
                html +='<rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />';
                html +='<rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor" />';
                html +='</svg>';
                html +='</span>';
                html +='</a>';
                html +='</div>';
                html +='</div>';
                html +='<div class="card-body">';
                html +='<div class="mb-5">';
                html +='<p class="text-gray-800 fw-normal mb-5">'+moment(v.TIMEIN).format('hh:mm A')+' - '+moment(v.TIMEOUT).format('hh:mm A')+'</p>';
                html +='<div class="d-flex align-items-center mb-5">';
                html +='<span class="ttype"> '+v.TYPE+'</span>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='<br/>';
                html +='</div>';
            });
            $('#lessons').append(html);
        });
}

$(document).ready(function(){
    var status = window.params.status;
    $('#lesson_status_lbl').text(status+' LESSONS');
    var start_date = moment().add(-10, 'days');
    var end_date = moment(start_date).add(21, 'days');
    store.set('start_date',start_date);
    store.set('end_date',end_date);
    store.set('date_selected',moment());
    date_listing(start_date,end_date);
    listgrid();
});