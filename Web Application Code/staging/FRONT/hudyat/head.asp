<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/detectlanguage.asp"-->
<!--#include file="includes/helper.asp"-->
<!--#include file="includes/logincheck.asp"-->

<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title><% Write(program_name) %></title>

  <!-- Favicon -->
	<link rel="apple-touch-icon" sizes="180x180" href="resources/favicon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="resources/favicon.png">
	<link rel="icon" type="image/png" sizes="16x16" href="resources/favicon.png">
	
  <!-- Libraries -->
  <link rel="stylesheet" href="libraries/bootstrap-3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="libraries/font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="libraries/jstree/themes/default/style.min.css">
  
  <!--- Kendo UI Stylesheet -->
  <link rel="stylesheet" href="kendoui/styles/kendo.common.min.css">
  <link rel="stylesheet" href="kendoui/styles/kendo.rtl.min.css">
  <link rel="stylesheet" href="kendoui/styles/kendo.blueopal.min.css">
	<link rel="stylesheet" href="kendoui/styles/kendo.mobile.all.min.css">
	

  
  <!-- Global CSS -->
		<% If UCASE(mode) = "DARK" Then %>
    <link rel="stylesheet" href="global_dark.css?t=<% Write(nocache_time) %>">
    <% Else %>
    <link rel="stylesheet" href="global.css?t=<% Write(nocache_time) %>">
    <%End If %>
  <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
	
	<!-- Mobile and Tablets Overrides -->
	<!-- <link rel="stylesheet" href="mediaqueries.css?t=<% Write(nocache_time) %>"> -->
  
  <!-- jQuery Library -->
  <script src="libraries/jquery/jquery-3.3.1.min.js"></script>
  <!--- Kendo UI for jQuery -->
	<!-- <script src="kendoui/js/angular.min.js"></script> -->
	<script src="kendoui/js/jszip.min.js"></script>
  <script src="kendoui/js/kendo.all.min.js"></script>

  <!-- Context Menu -->
  <link rel="stylesheet" href="libraries/jquery-contextmenu/2.7.1/jquery.contextMenu.min.css">
  <script src="libraries/jquery-contextmenu/2.7.1/jquery.contextMenu.min.js"></script>
	<!-- <script src="libraries/jquery-contextmenu/2.7.1/jquery.ui.position.js"></script> -->

  <!-- Detection -->
  <script src="libraries/mobile-detect.min.js"></script>
	
  <script>
    (function () {
        var params = {},
            r = /([^&=]+)=?([^&]*)/g;
        function d(s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        }
        var match, search = window.location.search;
        while (match = r.exec(search.substring(1)))
            params[d(match[1])] = d(match[2]);
        window.params = params;
    })();
  </script>
  
  <script>
    var global_config = {
      "main_url": "<% Write(main_url) %>",
      "casa_url": "<% Write(casa_url) %>",
      "main_casa_url": "<% Write(main_casa_url) %>",
      "casa_image_url": "<% Write(casa_image_url) %>",
      "main_program_folder": "<% Write(main_program_folder) %>",
      "rest_api_url": "<% Write(rest_api_url) %>",
      "acctg_api_url": "<% Write(acctg_api_url) %>",
      "hotel_api_url": "<% Write(hotel_api_url) %>",
      "rest_rpt_url": "<% Write(rest_rpt_url) %>",
      "acctg_rpt_url": "<% Write(acctg_rpt_url) %>",
      "hotel_rpt_url": "<% Write(hotel_rpt_url) %>",
      "email_url": "<% Write(email_url) %>",
      "sms_url": "<% Write(sms_url) %>",
			"systemapi_url": "<% Write(system_api_url) %>",
			"files_upload_url": "<% Write(files_upload_url) %>",
			"images_upload_url": "<% Write(images_upload_url) %>",
      "program_name": "<% Write(program_name) %>",
      "program_version": "<% Write(program_version) %>",
      "terminal": "<% Write(user_terminal) %>",
      "cookie": "<% Write(cookie_name) %>",
      "menu_selected": "<% Write(menu_selected) %>",
      "loggedin_date": "<% Write(Request.Cookies(cookie_name)("user_trandate")) %>",
 			"server_date": new Date(), // server date was changed to Client PC date
      "setting_logo_url": "<% Write(setting_logo_url) %>",
      "program_registeredto": "<% Write(program_registeredto) %>",
      "program_registeredto_address": "<% Write(program_registeredto_address) %>",
      "program_registeredto_telno": "<% Write(program_registeredto_telno) %>",
      "program_registeredto_website": "<% Write(program_registeredto_website) %>",
      "program_registeredto_email": "<% Write(program_registeredto_email) %>",
			"current_page": "<% Write(CurrentPageName()) %>",
			"mouseactivitylimit": "<% Write(program_mouseactivitylimit) %>",
			"vat": "<% Write(vat) %>",
			"active_user_limit": "<% Write(active_user_limit) %>",
			"branch": "<% Write(branch) %>",
			"mode": "<% Write(mode) %>",
			"global_progname": ""
    };
  </script>

</head>
  
<body>
<!-- 	ACCESS PERMISSION -->
	<div id="access_form"></div>
<!--- GLOBAL KENDO WINDOW -->

<!--- END: GLOBAL KENDO WINDOW -->


<!-- See "footer.asp" for the end tag -->