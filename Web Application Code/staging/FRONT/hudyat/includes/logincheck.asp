<%
' <LOGIN--CHECK>
' Check if now loggedin, If NOT redirect to login, If YES skip the process
Dim ppage
ppage = Instr(CurrentPageName(), "index.asp")

If Request.QueryString("validated") = "true" Then
Response.Cookies(cookie_name)("user_loggedin") = "true"
Response.Redirect "dashboard.asp"
End If
If ppage > 0 Then
  If Request.Cookies(cookie_name)("user_locked") = "true" Then
  Response.Redirect "lockscreen.asp"
  ElseIf Request.Cookies(cookie_name)("user_loggedin") = "true" Then
      Response.Redirect "dashboard.asp"
    End If
Else
    If Request.Cookies(cookie_name)("user_loggedin") = "" OR  (Request.Cookies(cookie_name)("user_loggedin") = "true_not_validated" AND Instr(CurrentPageName(), "authentication.asp") = False AND Instr(CurrentPageName(), "authentication_sms.asp") = False)  Then
      Response.Redirect "index.asp"
    ElseIf Request.Cookies(cookie_name)("user_locked") = "true" Then
     Response.Redirect "lockscreen.asp"
    End If
End If
' </LOGIN--CHECK>
%>