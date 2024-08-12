<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->

<!DOCTYPE html>
<html>
<head>
	
  <!-- Libraries -->
  <link rel="stylesheet" href="libraries/bootstrap-3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="libraries/font-awesome-4.7.0/css/font-awesome.min.css">
  
  <!--- Kendo UI Stylesheet -->
  <link rel="stylesheet" href="kendoui/styles/kendo.common.min.css">
  <link rel="stylesheet" href="kendoui/styles/kendo.rtl.min.css">
  <link rel="stylesheet" href="kendoui/styles/kendo.blueopal.min.css">
	<link rel="stylesheet" href="kendoui/styles/kendo.mobile.all.min.css">
	

  
  <!-- Global CSS -->
  <link rel="stylesheet" href="global.css?t=<% Write(nocache_time) %>">
	
	<!-- Mobile and Tablets Overrides -->
	<link rel="stylesheet" href="mediaqueries.css?t=<% Write(nocache_time) %>">
  
  <!-- jQuery Library -->
  <script src="libraries/jquery/jquery-3.3.1.min.js"></script>

  <!--- Kendo UI for jQuery -->
	<!-- <script src="kendoui/js/angular.min.js"></script> -->
	<!-- <script src="kendoui/js/jszip.min.js"></script> -->
  <script src="kendoui/js/kendo.all.min.js"></script>
	
  <script>
    var global_config = {
      "main_url": "<% Write(main_url) %>",
      "rest_api_url": "<% Write(rest_api_url) %>",
      "acctg_api_url": "<% Write(acctg_api_url) %>",
      "hotel_api_url": "<% Write(hotel_api_url) %>",
      "rest_rpt_url": "<% Write(rest_rpt_url) %>",
      "acctg_rpt_url": "<% Write(acctg_rpt_url) %>",
      "hotel_rpt_url": "<% Write(hotel_rpt_url) %>",
			"systemapi_url": "<% Write(system_api_url) %>",
      "program_name": "<% Write(program_name) %>",
      "program_version": "<% Write(program_version) %>",
      "terminal": "<% Write(user_terminal) %>",
      "cookie": "<% Write(cookie_name) %>"
    };
  </script>

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
</head>