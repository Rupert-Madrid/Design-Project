<!--#include file="includes/easyasp/easp.asp"-->
<!--#include file="includes/global_variables.asp"-->
<!--#include file="includes/helper.asp"-->
<%  
Dim errmsg
errmsg = "status=error&msg=Invalid Username Or Password!"
  
If Request.Form("tuserid") <> "" AND Request.Form("tpassword") <> "" Then
  Dim islogged

  Dim tmp
  Dim obj	
	Dim objHttp, params
	params = "login=true&module=HUDYAT&action=USERID_PASSWORD&userid=" & Request.Form("tuserid") & "&password="& Request.Form("tpassword") & "&callback=none"
	

	
	Set objHttp = Server.CreateObject("WinHTTP.WinHTTPRequest.5.1")
	objHttp.open "POST", system_api_url & "/AccessPermission.ashx?branch="+branch, False
	objHttp.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
	objHttp.Send(params)
	tmp = objHttp.responseText 
	Set objHttp = Nothing 

  'Test'
	'Response.Write(tmp)
	'Response.End()
	Dim branch_local 
	Dim otp_check 
	
  If tmp <> "[]" Then
     Set obj = Easp.Decode(tmp)
     user_name  = obj(0)("UserName")
     user_level = obj(0)("Level")
     access_module ="YES"
     branch_local = "ALL"
     otp_check = "NO"
     islogged = True
  Else
    islogged = False
  End If
  
  If islogged = True AND access_module = "YES" AND (branch =branch_local OR branch_local = "ALL") Then
      Response.Cookies(cookie_name).Expires = DateAdd("d", 1, Now())      ' 1 day Expiration of Cookie
      Response.Cookies(cookie_name)("expdate") =  DateAdd("d", 1, Now())  
      Response.Cookies(cookie_name)("shift") = Request.Form("tshift")
      Response.Cookies(cookie_name)("user_id") = Request.Form("tuserid")
      Response.Cookies(cookie_name)("user_name") = user_name
      Response.Cookies(cookie_name)("user_level") = user_level
      Response.Cookies(cookie_name)("user_terminal") = Request.Form("tterminal")
      Response.Cookies(cookie_name)("mode") = "light"
      Response.Cookies(cookie_name)("user_trandate") = Now()
      Response.Cookies(cookie_name)("branch") = branch
      If ucase(user_level) = "OWNER" OR otp_check = "NO" Then
      Response.Cookies(cookie_name)("user_loggedin") = "true"
      Response.Redirect("monitor.asp")
      Else
      Response.Cookies(cookie_name)("user_loggedin") = "true_not_validated"
      Response.Redirect("authentication_sms.asp")
      End If
      Response.End() 
  Else 
      'Response.Write(errmsg)
      Response.Redirect("index.asp?status=error")
      Response.End() 
  End If 
Else 
  'Response.Write("invalid") 
  Response.Redirect("index.asp?status=invalid")
  Response.End() 
End If 

'[DEBUG]  
'Write(Request.Cookies(cookie_name)("shift"))
'Write(Request.Cookies(cookie_name)("user_name"))
'Write(Request.Cookies(cookie_name)("user_level"))
%>