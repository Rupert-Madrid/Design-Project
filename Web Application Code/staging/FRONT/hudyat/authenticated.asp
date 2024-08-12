<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%  
Response.Cookies(cookie_name)("user_loggedin") = "true"
Response.Redirect("dashboard.asp")
%>