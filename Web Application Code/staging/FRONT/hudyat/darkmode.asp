<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%
Response.Cookies(cookie_name)("mode") = "dark"
Response.Redirect("dashboard.asp")
%>