<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%
Response.Cookies(cookie_name)("mode") = "light"
Response.Redirect("dashboard.asp")
%>