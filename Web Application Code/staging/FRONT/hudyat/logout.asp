<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%
Response.Cookies(cookie_name).Expires = DateAdd("d",-1,now())
Response.Cookies(cookie_name)("shift") = ""
Response.Cookies(cookie_name)("user_name") = ""
Response.Cookies(cookie_name)("user_level") = ""
Response.Cookies(cookie_name)("user_loggedin") = ""
Response.Redirect("index.asp")
%>