<!--#include file="includes/easyasp/easp.asp"-->
<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%  
      Response.Cookies(cookie_name)("user_locked") = "false"
      Response.Redirect("dashboard.asp")
%>