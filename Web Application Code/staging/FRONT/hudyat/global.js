function dashboard_menu(t){
	var id = $(t).attr('data-id');
	var progname = $(t).attr('data-progname');
	var title = $(t).attr('title');
	displayLoading($('body'));
	window.stop();
	$('#window_module').empty();
	$('#window_module').attr('data',id+'.asp');
	$('#wrapper').find('a').removeClass('nav_select');
	$('#wrapper').find('a[data-progname="'+progname+'"]').addClass('nav_select');
	hideLoading($('body'));
}
function dashboard_menu2(t){
	var id = $(t).attr('data-id');
	var progname = $(t).attr('data-progname');
	var title = $(t).attr('title');
	window.parent.$('#window_module').empty();
	window.parent.$('#window_module').attr('data',id+'.asp');
	store.set('prev_menu')
	window.parent.$('#wrapper').find('a').removeClass('nav_select');
	window.parent.$('#wrapper').find('a[data-progname="'+progname+'"]').addClass('nav_select');
}
// Create QRCode
create_qrcode = function(text, typeNumber,
    errorCorrectionLevel, mode, mb) {

  qrcode.stringToBytes = qrcode.stringToBytesFuncs[mb];

  var qr = qrcode(typeNumber || 4, errorCorrectionLevel || 'M');
  qr.addData(text, mode);
  qr.make();

//  return qr.createTableTag();
//  return qr.createSvgTag();
  return qr.createImgTag();
};

// Update QRCode
update_qrcode = function() {
  var msg = location.href;
  var text = msg.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
  var t = 6;
  var e = "M";
  var m = "Byte";
  var mb = "UTF-8";
  document.getElementById('qr').innerHTML = create_qrcode(text, t, e, m, mb);
};

// Global modal window
function modal_global(title, url, size = 'large') {
    var dialog = bootbox.dialog({
        title: title,
        message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
    });
    dialog.init(function(){
        dialog.find('.bootbox-body').load(url);
        if (size == 'large') {
          dialog.find("div.modal-dialog").addClass("modal_global_size");
          dialog.find("div.modal-body").addClass("modal_global_body");
        }
    });
}

// Browsing (iframe type)
function open_browsing_iframe(title, url, showit) {
   
  var tmpl = '';
  tmpl += '<div class="modal_viewer_dialog" style="display:none; color:white">';
  tmpl += '<div class="row alert-regular" style="padding-left: 40px;">';
  tmpl += '<h4 class="text-left">';
  tmpl += '</h4>&nbsp;';
  tmpl += '<a href="#!" style="color:white; font-size:12px" onclick="location.reload()">[Close]</a>';
  tmpl += '</div>';
  tmpl += '<iframe class="modal_viewer_frame" src="'+ url +'" width="600" height="400">';
  tmpl += '</iframe>';
  tmpl += '</div>';
  $(tmpl).insertAfter('body');
 
   $('.modal_viewer_dialog h4').text(title);
   $('.modal_viewer_frame').css( {
     'width': ($(document).width() - 5) + 'px',
     'height': ($(document).height() - 90) + 'px',
     'border': '1px solid transparent'
   });
   $('.modal_viewer_dialog').css( {
     'width': $(document).width() + 'px',
     'height': ($(document).height() - 20) + 'px',
     'position': 'absolute',
     'top': 0,
     'left': 0,
     'display': 'block',
     'z-index': 9999,
     'background': '#7FDBFF'
   });
   //$('.modal_viewer_frame').attr("src", url);
   if (typeof showit !== "undefined") {
     $('.modal_viewer_dialog').show();
   } else {
     $('.modal_viewer_dialog').hide();
   }
}

// Browsing (modal type)
function open_browsing(title, url, target_id) {
  store.set('_target_id', target_id);
  window.browse_dialog = bootbox.dialog({
      title: 'Browse ' + title,
      message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>',
      backdrop: false,
      onEscape: true
      //closeButton: false
  });
  window.browse_dialog.init(function(){
    window.browse_dialog.find('.bootbox-body').load(url);
  });
}

function close_browsing(mainkey) {
  var target_id = store.get('_target_id');
  store.remove('_target_id');
  $('#'+target_id).val(mainkey);
  window.browse_dialog.find('.bootbox-close-button').trigger('click');
}

// Global popup window
var windowObjectReference = null; // global variable
function open_popup(strUrl, strWindowName) {
  if(windowObjectReference == null || windowObjectReference.closed) {
    windowObjectReference = window.open(strUrl, strWindowName,
           "resizable,scrollbars,status");
  } else {
    windowObjectReference.focus();
  }
  setTimeout(function() {
        windowObjectReference.moveTo(0,0);
        windowObjectReference.resizeTo(1000, 600);
  }, 1000);
}

function printlocal(url) {
  window.location = url;
}

function generateColorHex() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

// Report modal window PDF
function modal_report_pdf(title, url, showit) {
   var tmpl = '<!-- MODAL FOR REPORT VIEWING -->';
   tmpl += '<div class="report_viewer_dialog" style="display:none; color:white">';
   tmpl += '<div class="row alert-regular" style="padding-left: 40px;">';
   tmpl += '<h4 class="text-left">';
   tmpl += '</h4>&nbsp;';
   tmpl += '<a href="#!" style="color:white; font-size:12px" onclick="location.reload()">[Close]</a>';
   tmpl += '</div>';
   tmpl += '<iframe class="report_viewer_frame" src="'+ url +'" width="600" height="400">';
   tmpl += '</iframe>';
   tmpl += '</div><!-- END:MODAL FOR REPORT VIEWING -->';
   $(tmpl).insertAfter('body');
  
    $('.report_viewer_dialog h4').text(title);
    $('.report_viewer_frame').css( {
      'width': ($(document).width() - 5) + 'px',
      'height': ($(document).height() - 90) + 'px',
      'border': '1px solid transparent'
    });
    $('.report_viewer_dialog').css( {
      'width': $(document).width() + 'px',
      'height': ($(document).height() - 20) + 'px',
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'display': 'block',
      'z-index': 9999,
      'background': '#7FDBFF'
    });
    //$('.report_viewer_frame').attr("src", url);
    if (typeof showit !== "undefined") {
      $('.report_viewer_dialog').show();
    } else {
      $('.report_viewer_dialog').hide();
    }
}


/* deserialize jquery serialize method */
function deserialize(identifier) {
    var form_data = identifier.split('&');
    var input     = {};

    $.each(form_data, function(key, value) {
        var data = value.split('=');
        input[data[0]] = decodeURIComponent(data[1]);
    });
    return input;
}

/* json to param */
function json2param(data) {
   var url = '';
   for (var prop in data) {
      url += encodeURIComponent(prop) + '=' + 
          encodeURIComponent(data[prop]) + '&';
   }
   return url.substring(0, url.length - 1)
}

/* serialize to json */
function serializeJSON(form) {
  var formdata = $(form).serializeArray();
  var data = {};
  $(formdata ).each(function(index, obj){
      data[obj.name] = obj.value;
  });
  return data;
}

function GetPrinter(prntLocation) {
  var printername;
  var url = global_config.rest_api_url + '/Printersel.ashx?action=load';
  var printer = $.ajax({
    url: url,
    async: false
  }).responseText;
  var print = JSON.parse(printer)
  $.each(print, function(k, v) {
    if (v.pDefault == prntLocation) {
      printername = v.pPath;
    }
  })
  return printername;
}

function isLeapYear(year) {
     return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function daysOfYear(year) 
{  
  return isLeapYear(year) ? 366 : 365;
}

function daysInThisMonth(year, month) {
  return moment(year+"-"+month, "YYYY-MM").daysInMonth();
}

function shortText(str, lenn) {
  return str.substr(0, lenn) + '..';
}

function redirect(url) {
  window.location = url;
}

Date.prototype.isValid = function () {
  // An invalid date object returns NaN for getTime() and NaN is the only
  // object not strictly equal to itself.
  return this.getTime() === this.getTime();
};

function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done! 
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();
}


function toggleBottomBar() {
	$('.footer-indicator').toggle();
	$('.icon-bar').toggle();
}

function displayLoading(target) {
		var element = $(target);
		kendo.ui.progress(element, true);  
}

function hideLoading(target) {
		var element = $(target);
		kendo.ui.progress(element, false);
}

function dynamicWin(name, title, url, size_decrease, winstate, ismodal, isresizable) {
	store.set('win_title',title);
    var my_win = $("#window-" + name).data("kendoWindow");
    if (my_win) {
        // already exist, reuse it
			  // dont cache URL so it will get the latest records
			  my_win.title(title);
			  my_win.refresh({ url: url });
        my_win.center().open();
    } else {
        // does not exist, create it
        // create a div with id "name" for my window and append it to 
        // to a container ("example") where all the windows are going to be.
				var html = '<div id="window-'+ name +'"></div>';
				$('body').prepend(html);
        var h = 0;
			  var w = 0;
			  if (typeof size_decrease === 'undefined' || typeof size_decrease.h === 'undefined') {
					h = $(document).height() - size_decrease;
			  	w = $(document).width() - size_decrease;
				} else {
					h = size_decrease.h;
					w = size_decrease.w;
				}
        $('#window-'+ name).kendoWindow({
          title: title,
          visible: false,
					modal: ismodal,
          width: w + "px",
          height: h + "px",
					resizable: isresizable,
					iframe: true,
					content: url,
          actions: [
							// "Minimize",
							// "Maximize",
							"Close"
          ],
					pinned: true,
					position: { top: 100 },
					activate: function(e) {
					},
					deactivate: function() {
						var dialog = $("#window-" + name).data("kendoWindow");
						dialog.center();
					},
          refresh: function(e) {
						hideLoading('#window-'+ name);
            var win = this;
            $('#close').click(function(){
                win.close();
            });
          },
					minimize: function(e) {
						$('#window-'+ name).parent().addClass('mini-width');
					},
					open: function() {
							//set parentWindowName
							store.set('parentWindowName', '#window-'+ name);
						  displayLoading('#window-'+ name);
							setTimeout(function() {
									$('#window-'+ name).parent().removeClass('mini-width');
							}, 1000);
						//for auto line account entry
					},
					close: function(e){
						store.remove('multiple_selection');
						if(e.sender.element.attr('id')=='window-browsechartacct'&& store.get('browsetype_acctentry')==='multi'){
								acctentry();
						}
						store.remove('browsetype_acctentry');
						
						if(e.sender.element.attr('id')=='window-browseproduct' && (store.get('browsing') != true && store.get('gridname')=='product')){
							new_product();
							store.remove('gridname');
						}
						if(e.sender.element.attr('id')=='window-upload_files' ){
							listgrid();
						}
							store.remove('browsename');
					},
					resize: function(e) {
// 							var dialog = $("#window-" + name).data("kendoWindow");
// 						  dialog.close();
// 						  dialog.open();
					}
        });
			
			  var mywin = $("#window-" + name).data("kendoWindow");
			  if (typeof winstate !== 'undefined') {
					if (winstate === "max") {
						mywin.open().maximize();		
					}
					else if (winstate === "min") {
						mywin.open().minimize();
					}
					else {
						mywin.center().open();
					}
				} else {
					mywin.open();
				}
			  
			
			  // Change window title background color
			  var random_color = generateColorHex();
			  $("#window-" + name).parent().find('.k-window-titlebar,.k-window-actions').css('backgroundColor', '#616161');
			  $("#window-" + name).parent().find('.k-window-title').css({
					'width': '94%',
					'font-size': '16px',
					'font-weight': 'bold',
					'color': 'black',
					'text-align': 'left',
					'padding-left': '7px',
					'margin-bottom': '-3px !important',
					//'background-color': random_color, //'#d6992a7d',
					'border-left': '4px solid white',
					'border-bottom': '1px dotted white',
					// 'text-shadow': 'rgb(88, 83, 83) 1px 2px 4px'
				});
			  
    }
}

function dynamicWinClose(window_name, trigger_name) {
	window.parent.$('body').find('#window-'+ window_name).data("kendoWindow").close();
	window.parent.$('body').trigger(trigger_name);
}

function centerWin(name) {
    var my_win = $("#window-" + name).data("kendoWindow");
		// center window if already exists
    if (my_win) {			
        my_win.center().open();
    }
}

function openmodule(t) {
	var id = $(t).attr('data-id');
	var title = $(t).attr('title');
	var url = global_config.main_url + global_config.main_program_folder + '/'+id+'.asp';
	if (typeof id === "undefined") {
		url = $(t).attr('data-url');
		id = window.btoa(title);
	}
	dynamicWin(id, title, url, 500, "max", false,true);
}


//SUPPLIER BROWSE CLOSE
$('body').on('browsesupplierclose', function() {
	var supnum = store.get('supnum');
	var supname = store.get('supname');
	var terms = store.get('terms');
	var vat = store.get('vat');
	store.remove('supname');
	store.remove('supnum');
	store.remove('terms');
	store.remove('vat');
	store.remove('itemselected');
	if (store.get('browsing')!=true){
	var grid = $('#acctentry_grid').data("kendoGrid");
	var item = grid.dataItem(grid.select());
	$.getJSON(global_config.acctg_api_url + '/Supmast.ashx?action=BY_ID&id=' + supnum).always(function(data) {
		if(data.length>0){
			$.each(data, function(k, v) {
					item.set("APSUPNUM", v.SUPNUM);
			});
			}else{
				bootbox.alert('Supplier not found');
					item.set("APSUPNUM", '');
			}
		});
	}else{
		$('#supname').val(supname);
		$('#supnum').val(supnum).trigger('change');
		$('#terms').val(terms).trigger('change');
		$('#vat').val(vat);
		
	}
	store.remove('browsing');
});
//CUSTOMER BROWSE CLOSE
$('body').on('browsecustomerclose', function() {
	var custnum = store.get('custnum');
	var custname = store.get('custname');
	var itemselected = store.get('itemselected');
	store.remove('custnum');
  store.remove('custname');
  store.remove('itemselected');
	if (store.get('browsing')!=true){
	var grid = $('#acctentry_grid').data("kendoGrid");
  var item = grid.dataItem(grid.select());
  
	$.getJSON(global_config.acctg_api_url + '/Cusmast.ashx?action=BY_ID&id=' + custnum).always(function(data) {
		if(data.length>0){
			$.each(data, function(k, v) {
					item.set("ARCUSTNUM", v.CUSTNUM);
			});
			}else{
				bootbox.alert('Customer not found');
					item.set("ARCUSTNUM", '');
			}
    });
  }else{
		$('#custnum').val(custnum);
		$('#custname').val(custname);
		$('#agentcode').val(itemselected.AGENTCODE);
		if($('#agentname').data('kendoComboBox')!== undefined){
			$('#agentname').data('kendoComboBox').value(v.AGENTNAME);
		}else{
			$('#agentname').val(v.AGENTNAME);
		}
		$('#address').val(itemselected.ADDRESS1);
		$('#telno').val(itemselected.TELNO);
		var terms = itemselected.TERMS;
		if(terms==null || terms == undefined){
			terms = 0;
		}
		$('#terms').val(terms);
		$('#custnum').trigger('change');
		
	}
	store.remove('browsing');
});


//REMOVE STEP IN INPUT TYPE NUMBER
$("input[type=number]").on("focus", function() {
	$(this).on("keydown", function(event) {
		if (event.keyCode === 38 || event.keyCode === 40) {
			event.preventDefault();
		}
	});
});

//select all every focus
$("input").focus(function() {
	$(this).select();
});
$("textarea").focus(function() {
	$(this).select();
});

//DATEPICKER WITH MASK EDIT
(function ($) {
  var kendo = window.kendo,
      ui = kendo.ui,
      Widget = ui.Widget,
      proxy = $.proxy,
      CHANGE = "change",
      PROGRESS = "progress",
      ERROR = "error",
      NS = ".generalInfo";

  var MaskedDatePicker = Widget.extend({
    init: function (element, options) {
      var that = this;
      Widget.fn.init.call(this, element, options);

      $(element).kendoMaskedTextBox({ mask: that.options.dateOptions.mask || "00/00/0000" })
      .kendoDatePicker({
        format: that.options.dateOptions.format || "MM/dd/yyyy",
        parseFormats: that.options.dateOptions.parseFormats || ["MM/dd/yyyy", "MM/dd/yy"]
      })
      .closest(".k-datepicker")
      .add(element)
      .removeClass("k-textbox");
			
			// Validate datemaskpicker
			var validator = $(element).kendoValidator({
				rules: {
					datepicker: function(input) {
						var date = kendo.parseDate(input.val(), "MM/dd/yyyy");
						if (date) {
							return true;
						} else {
							return input.data("kendoDatePicker").value();
						}
					}
				},
				messages: {
					datepicker: "Please enter valid date!" 
				}
			}).data("kendoValidator");
    },
    options: {
      name: "MaskedDatePicker",
      dateOptions: {}
    },
    destroy: function () {
      var that = this;
      Widget.fn.destroy.call(that);

      kendo.destroy(that.element);
    },
    value: function(value) {
      
      var datepicker = this.element.data("kendoDatePicker");
      
      if (value === undefined) {
        return datepicker.value(); 
      }

      datepicker.value(value);
    }
  });

  ui.plugin(MaskedDatePicker);

})(window.kendo.jQuery); 

function keypress_delete(event){
	var key = event.charCode || event.keyCode || event.which;
	if( key === 8 || key=== 46 ){
		event.preventDefault();
		return false;
	}	
}
//kendo window for report
function report_win(name,title,url){
	dynamicWin(name, title, url, 500, "max", false,true);
}

function opendivbox(id, url, pos = null) {
	if (!pos) {
		pos = {
			top: "20%",
			left: "0%"
		};
	}
	
	var divbox = $('#divbox-'+id);
	if (divbox.length == 0) {
		var div = '<div id="divbox-'+ id +'" class="divbox"></div>';
		$('body').append(div);
		
		// re-initialize
		divbox = $('#divbox-'+id);
		
		// load the resource page
		divbox.load(url, function() {
			// set the first CSS received
			divbox.css(pos);
			
			// MOBILE: if in mobile view overwrite the CSS
			if (typeof window.params.mobileview !== "undefined") {
				pos = {
					top: "0%",
					left: "0%",
					width: $(document).width(),
					height: $(document).height()
				};
				divbox.css(pos);
				divbox.find('table:first').css('width','10%').css({
						width: $(document).width(),
						height: $(document).height()
				});
			}
			// END:MOBILE: if in mobile view overwrite the CSS
			
			// DESKTOP: apply dragging in desktop view only 
			if (typeof window.params.mobileview === "undefined") {
					// set dragging to the element
					var $draggable = divbox.draggabilly();

					// restore lastposition
					$.each(store.getAll(), function(k,v) {
						//console.log(k, v);
						if (k.startsWith("divbox-"+id)) {
							divbox.draggabilly( 'setPosition', v.x, v.y );
						}
					});

					// events
					$draggable.on('dragEnd', function( event, pointer ) {
						var d = $('#'+event.currentTarget.id).position();
						store.set(event.currentTarget.id, { x: d.left, y: d.top })
					});				
			}
			// END:DESKTOP: apply dragging in desktop view only 
			
		});
	}	else {
		divbox.fadeIn("fast");
	}
	
}

function closedivbox(p) {
	var el = $('#divbox-'+ p);
	el.fadeOut("fast");
}

function isOnMobile() {
	var isMobile = false; //initiate as false
  var md = new MobileDetect(window.navigator.userAgent);
	if (md.phone()) {
		isMobile = true;
	}
	return isMobile;
}
function isOnTablet() {
	var isTablet = false; //initiate as false
  var md = new MobileDetect(window.navigator.userAgent);
	if (md.tablet()) {
		isTablet = true;
	}
	return isTablet;
}

function CheckTimeZone() {
// 		$.get("//worldtimeapi.org/api/timezone/Asia/Manila").done(function(data) {
// 			var l = moment().utcOffset(); // local timezone offset
// 			var gl = moment(data.utc_datetime).utcOffset();  // global timezone offset
// 			// check if localtimezone match with global timezone (Asia/Manila)
// 			// ..if not MATCH will prompt user to try to change there Local PC timezone
// 			if (l !== gl || (typeof window.params.testtimezone !== "undefined")) {
// 				var msg = '<h3><b>REMINDER:</b><br>Your LOCAL Computer Timezone was not matched with the current SERVER Timezone</h3>';
// 				msg += '<h4>Please Set Your Timezone Offset  +8:00 (Asia/Manila or Kuala Lumpur/Singapore)</h4>';
// 				msg += '<br><b>To See How to correct this settings. Just follow instructions Link Below:</b><br>';
// 				msg += '<ul>';
// 				msg += '<li><a target="_blank" href="https://www1.pagasa.dost.gov.ph/303-time-synchronization-for-windows-7-and-8">Windows XP,7,8,10</a></li>';
// 				msg += '<li><a target="_blank" href="https://www.wikihow.com/Change-Date-and-Time-on-an-Android-Phone">Android Phone</a></li>';
// 				msg += '</ul>';
// 				bootbox.alert(msg);
// 			}
// 		});
}

function ChangePassword(t) {
	var url = $(t).attr('data-href');
	var winsize = {
		w: 400,
		h: 200
	};
	dynamicWin('changepassword', 'Change Password', url, winsize, null, false, false);
}

function sendEmail(info) {
	
}

//browse chart of account - all journal entry browsing in the grid will entry this function
function chartacct_browsemulti(event, attribute) {
	//enter key
	if (event.keyCode === 13) {
	store.set('browsetype_acctentry','multi');
	var gridname = store.get('gridname');
		event.preventDefault();
		var grid = $("#"+gridname).data("kendoGrid");
		var current_selected = grid.dataItem(grid.select());
		//if 
		if (current_selected.CREDIT + current_selected.DEBIT == 0) {
			delete_tran(attribute);
			var lastrow = grid.dataSource.total() - 1;
			grid.select('tr:eq(' + lastrow + ')');
			var item = grid.dataItem(grid.select());
			var deletelastrow = {
				"grid": gridname,
				"id": item.uid
			}
			delete_tran(deletelastrow);
		} else {
			store.set('browsing', false);
			store.set('browsename', 'browsechartacct');
			store.set('browsetype_acctentry','single');
		}
		var winsize = {
			h: 500,
			w: 500
		}
		var url = global_config.main_url + global_config.main_program_folder + '/chartacct_browse.asp';
		dynamicWin("browsechartacct", "Chart of Account Browsing", url, winsize, null, false);
	
	}
}
//CHARTOFACCT BROWSE CLOSE SINGLE
$('body').on('browsechartacctclose', function() {
	var itemselected = store.get('itemselected');
	var gridname = store.get('gridname');
	var module = store.get('module');
	var grid = $('#'+gridname).data('kendoGrid');
	var dataItem = grid.dataItem(grid.select());
	store.remove('itemselected');
	store.remove('module');
	if(itemselected!==undefined){
		dataItem.set('ACCTNO',itemselected.ACCTNO);
		if(module == "DR"){
			// dataItem.set('ACCTNAME',itemselected.ACCTNAME + ' - ' + itemselected.COSTNAME);
			dataItem.set('ACCTNAME',itemselected.ACCTNAME);
		}else{
			dataItem.set('ACCTNAME',itemselected.ACCTNAME);
		}
		
	}else{
		var acctno = store.get('acctno');
		//var acctname = store.get('acctname');
		var acctname = '';
		store.remove('acctno');
		store.remove('acctname');
		$.getJSON(global_config.acctg_api_url + '/ChartOfAccount.ashx?action=BY_MULTIPLE&id=' + acctno+'&acctname='+acctname).always(function(data) {

			if(data.length>0){
				store.remove('browsetype');
				$.each(data, function(k, v) {
						dataItem.set("ACCTNO", v.ACCTNO);
						if(module == "DR"){
							dataItem.set('ACCTNAME',v.ACCTNAME );
						}else{
							dataItem.set('ACCTNAME',v.ACCTNAME);
						}
				});
				}else{
					if (dataItem.ACCTNO!=''){
					bootbox.alert('Account is not found')
						dataItem.set("ACCTNO", '');
						dataItem.set("ACCTNAME", '');
					}
				}
			});
	}
});


function setUserStatus(status) {
	var mysession = getUserSession();
	$.get(global_config.systemapi_url + "/AccessPermission.ashx?action=CHANGESTATUS&userid="+ mysession.user_id +"&status="+ status).always(function() {
		console.log('User was set to ' + status)
	});
}

function countActiveUser() {
	var mysession = getUserSession();
	$.get(global_config.systemapi_url + "/AccessPermission.ashx?action=USERSTATUSCOUNT&status=LOGIN").always(function(data) {
	
		var active_user = data.length;
		$('.factiveuser').text(active_user + " out of " + global_config.active_user_limit);
	});	
}


function getUserSession() {
	var mysession = deserialize(Cookies.get(global_config.cookie));
	return mysession;
}

// Main entry
$(document).ready(function() {	
	$('.copy_paste_disable').bind("cut copy paste",function(e) {
		e.preventDefault();
	});
	$(".copy_paste_disable").attr("ondrop","return false;");
	
		$("#access_form").kendoWindow({
			content: "access_permission.asp",
				title: "Access Permission",
			visible: false,
			actions: [
					"Close"
				],
		});
		store.remove('browsetype'); // this delete the remnants of browstype this use in browsing
		store.remove('itemselected');
	
    $('.datepicker').kendoDatePicker();
    if (global_config.loggedin_date) {
      $('.floggeddate').text(global_config.loggedin_date)
    }
	
	  if(typeof global_config.server_date !== "undefined") {
			$('.fsystemdate').text(moment(global_config.server_date).format('M/D/Y hh:mm A'));
		}
	  
	  setUserStatus('LOGIN');
	  countActiveUser();
	
		CheckTimeZone();	  
	
		var mysession = deserialize(Cookies.get(global_config.cookie));
		if (mysession.user_level.toUpperCase() == 'OWNER'){
			store.set('price_edit',true)
		}else{
			store.set('price_edit',false)
		}
	
	//APPLY IN ALL POSTING - EVERY MANUAL INPUT
	$('#deptno').change(function() {
		var deptno = $('#deptno').val();
		$.getJSON(global_config.acctg_api_url + '/Department_File.ashx?action=BY_ID&id=' + deptno).always(function(data) {
			if(data.length<1){
				bootbox.alert('Department not found');
				$('#deptno').val('');
				$('#deptname').val('');
				return false;
			}
			$.each(data, function(k, v) {
				$('#deptno').val(v.DEPTNO);
				$('#deptname').val(v.DEPTNAME);
			});
		});
	});
	$('#agentcode').change(function() {
		var agentcode = $('#agentcode').val();
		if(agentcode=='ALL' || agentcode=='LIVESTREAM'){
			return false;
		}
		$.getJSON(global_config.acctg_api_url + '/AgentFile.ashx?action=BY_ID&id=' + agentcode).always(function(data) {
			if(data.length<1){
				bootbox.alert('Agent not found');
				$('#agentcode').val('');
				$('#agentname').val('');
				return false;
			}
			$.each(data, function(k, v) {
				$('#agentcode').val(v.AGENTCODE).trigger('change.select2');
				$('#agentname').val(v.AGENTNAME);
				// if($('#agentname').data('kendoComboBox')!== undefined){
				// 	$('#agentname').data('kendoComboBox').value(v.AGENTNAME);
				// }else{
				// 	$('#agentname').val(v.AGENTNAME);
				// }
				
			});
		});
	});
		
	//SUPPLIER CHANGE
	$('#supnum').change(function() {
		var supnum = $('#supnum').val();
		if(supnum=='ALL'){
			return false;
		}
		if(supnum==''){
			return false;
		}
	
		$.getJSON(global_config.acctg_api_url + '/Supmast.ashx?action=BY_ID&id=' + supnum).always(function(data) {
			if(data.length<1){
				bootbox.alert('Supplier not found');
				$('#supname').val('');
				$('#contact').val('');
				$('#telno').val('');
				$('#email_supplier').val('');
				$('#supnum').val('');
				$('#terms').val('');
				$('#vat').val('');
				$('#vatno').val('');
				
			}
			$.each(data, function(k, v) {
				$('#supname').val(v.SUPNAME);
				$('#contact').val(v.CONTACT);
				$('#telno').val(v.TELNO);
				$('#email_supplier').val(v.EMAIL);
				$('#terms').val(v.TERMS).trigger('change');
				if(v.VATBLE !=='' && v.VATBLE !== undefined){
					$('#vat').val(v.VATBLE);
				}
				$('#vatno').val(v.TINNO);
			});
		});
	});
	
	$('#custnum').change(function() {
		var custnum = $('#custnum').val();
		$.getJSON(global_config.acctg_api_url + '/Cusmast.ashx?action=BY_ID&id=' + custnum).always(function(data) {
			$.each(data, function(k, v) {
				$('#address').val(v.AREANAME);
				$('#custname').val(v.CUSTNAME);
				$('#custnum').val(v.CUSTNUM).trigger('change.select2');
				$('#terms').val(v.TERMS);
				$('#agentcode').val(v.AGENTCODE).trigger('change.select2');
				$('#agentname').val(v.AGENTNAME);
				
			});
		});
	});

		CheckTimeZone();
		// This will show the loading icon when program trigger AJAX request globally
// 		$.ajax({
// 				beforeSend: function() {
// 					displayLoading($('body'));
// 				},
// 				success: function(msg){
// 					hideLoading($('body'));
// 				}
// 		})
var time = moment().format('HH');
var mysession = getUserSession();
var login_date = moment(mysession.user_trandate.replace(/[#+]/g,' ')).format('HH');
if(time>=18 && login_date <18 && mysession.user_level.toUpperCase()!=="OWNER"){
	window.location = "logout.asp";
}

$("#messagebtn").click(function(){
	var mysession = deserialize(Cookies.get(global_config.cookie));
	if(mysession.user_name.replace('+',' ').toUpperCase()=="CASA MERKADO"){
		$("#message_window").kendoWindow({
			height: "500px",
			width: "400px",
			content:"messages_admin.asp",
			title:false,
			visible: false,
			resizable:false,
			position: {
			  top: 110, 
			  left: "1100px"
			},
			actions: [
				],
		}).data("kendoWindow");
	}else{
		
		$("#message_window").kendoWindow({
			height: "500px",
			width: "400px",
			content:"messages.asp",
			title:"Casa Merkado",
			visible: false,
			resizable:false,
			draggable:false,
			position: {
			top: 110, 
			left: "1100px"
			},
			actions: [
				],
		}).data("kendoWindow");
	}	
	var win = $("#message_window").data("kendoWindow");
	if(win.element.is(":hidden")){
		win.open();
	}else{
		win.close();
	}
	$('.notif').removeClass('new_message_highlight');
});
var mysession = deserialize(Cookies.get(global_config.cookie));	
});
$(document).keydown(function(e){
	if( e.which === 27 ){
		var prev_menu = store.get('prev_menu');
		if(prev_menu !== undefined){
			location.href = prev_menu;
			store.remove('prev_menu');
		}
	}
});

$(window).on("mousedown", function(e) {     
	if($('#window-viewphoto').data("kendoWindow")){
		$('#window-viewphoto').data("kendoWindow").close();
	}   
});
$("#grid").on("click", ".customEdit", function(){
  var row = $(this).closest("tr");
  $("#grid").data("kendoGrid").editRow(row);
});

$("#grid").on("click", ".customDelete", function(){
  var row = $(this).closest("tr");
  $("#grid").data("kendoGrid").removeRow(row);
});
KTApp.setThemeMode("dark", function() {
    console.log("changed to dark mode");
}); // set dark mode



			// Format options
			const optionFormat = (item) => {
				if (!item.id) {
					return item.text;
				}
	
				var span = document.createElement('span');
				var template = '';
	
				template += '<div class="d-flex align-items-center">';
				template += '<div class="d-flex flex-column">'
				template += '<span class="">' + item.text + '</span>';
				template += '<span class="fs-5">' + item.element.getAttribute('data-kt-rich-content-subcontent') + '</span>';
				template += '</div>';
				template += '</div>';
	
				span.innerHTML = template;
	
				return $(span);
			}
	
var user_id = $('#user_image').attr('userid');
var image_path = global_config.main_casa_url + "/systemapi/GetImage.ashx?module_code=USER_FILE&refno="+user_id+"&cache="+Math.random();
$('#user_image').attr('src',image_path);
$('#user_image2').attr('src',image_path);

var mysession = deserialize(Cookies.get(global_config.cookie));
if (mysession.user_level.toUpperCase() !=="OWNER"){
  //PROGRAM RIGHTS
  $.getJSON(global_config.systemapi_url + '/UserProgramRight.ashx?action=ALL&criteria=ALL').always(function(data) {	

	$.getJSON(global_config.systemapi_url + '/UserRights.ashx?action=BY_USERID&USERID=' +mysession.user_id).always(function(data1) {
	  $.each(data,function(k,v){
		  var isAccessible = false;
		$.each(data1,function(k1,v1){
			if(v.PROGID==v1.PROGID){
				if(global_config.global_progname == v.PROGNAME){
					isAccessible =true;
				}
			  $('.aside-menu').find('a[data-progname="'+v.PROGNAME+'"]').removeClass('hide');
			  $('.aside-menu').find('div[data-progname="'+v.PROGNAME+'"]').removeClass('hide');
			  $('#kt_header_user_menu_toggle').find('a[data-progname="'+v.PROGNAME+'"]').removeClass('hide');
			}
		});
	  });
	});
	
	if(isAccessible==false && global_config.global_progname !=="" && global_config.global_progname !==undefined){
		global_config.global_progname="";
		window.location = "dashboard.asp";
	}
  });
}else{
  $('.aside-menu').find('a').removeClass('hide');
  $('.aside-menu').find('div').removeClass('hide');
  $('#kt_header_user_menu_toggle').find('a').removeClass('hide');
}


function reset_inventory(){
	bootbox.confirm('Are you sure you want to reset Inventory?', function(data) {
		if (data) {
			$.post(global_config.acctg_api_url + '/ResetInventory.ashx').always(function() {
				alert("Inventory Reset.");
			});
		}
	});
}