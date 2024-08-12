<%
' File: global_variables.asp
' Date         Modified By    Purpose
' 08/04/18     Joven          Create file
' 08/05/18     Joven          Add additional functions

Function Write(Byval str)
  Response.Write(str)
End Function

Function PageName()
    Dim a
    a = Request.ServerVariables("SCRIPT_NAME")
    a = Replace(a, ".asp", "")
    a = Replace(a, "/", "")
    Write(a)
End Function

Function CurrentPageName()
    Dim a
    a = Request.ServerVariables("PATH_INFO")
    CurrentPageName = a
End Function

Function IsCurrentPage(lookpage)
    Dim a
    a = Request.ServerVariables("PATH_INFO")
    If InStr(a, lookpage) = 0 Then
			IsCurrentPage = False
		Else
			IsCurrentPage = True
		End If
End Function

Function W(Byval keyname)
  Response.Write lang.Item(keyname)
End Function

Function MultiLanguageJS()
  Dim i, ii, kk
  ii=lang.Items
  kk=lang.Keys

  Response.Write("<script>")
  Response.Write("var lang = [];" & vbcrlf)
  For i=0 to lang.Count-1
      Response.Write("lang["""& kk(i) &"""] = '" & ii(i) & "';" & vbCrLf)
  Next
  Response.Write("</script>" & vbCrLf)

  Response.Write("<script>" & vbCrLf)
  Response.Write("function MMM(str) {" & vbCrLf)
  Response.Write("  return lang[str];" & vbCrLf)
  Response.Write("}" & vbCrLf)
  Response.Write("</script>" & vbCrLf)
End Function

Function GetFullURL()
    Dim strProtocol
    Dim strDomain
    Dim strPath
    Dim strQueryString
    Dim strFullUrl

    If lcase(Request.ServerVariables("HTTPS")) = "on" Then 
        strProtocol = "https" 
    Else
        strProtocol = "http" 
    End If

    strDomain= Request.ServerVariables("SERVER_NAME")
    strPath= Request.ServerVariables("SCRIPT_NAME") 
    strQueryString= Request.ServerVariables("QUERY_STRING")

    strFullUrl = strProtocol & "://" & strDomain & strPath
    If Len(strQueryString) > 0 Then
      strFullUrl = strFullUrl & "?" & strQueryString
    End If

    GetFullURL = strFullUrl
End Function


Function GetDomain()
    Dim strProtocol
    Dim strDomain
    Dim strPath
    Dim strQueryString
    Dim strFullUrl

    If lcase(Request.ServerVariables("HTTPS")) = "on" Then 
        strProtocol = "https" 
    Else
        strProtocol = "http" 
    End If

    strDomain= Request.ServerVariables("SERVER_NAME")
    strPath= Request.ServerVariables("SCRIPT_NAME") 
    strQueryString= Request.ServerVariables("QUERY_STRING")

    GetDomain = strProtocol & "://" & strDomain
End Function

Function CurrentDate()
    CurrentDate = Month(Date()) & "/" & Day(Date()) & "/" & Year(Date())
End Function

Function ServerDateTime()
	Dim dd, mm, yy, hh, nn, ss
	Dim datevalue, timevalue, dtsnow, dtsvalue

	'Store DateTimeStamp once.
	dtsnow = Now()

	'Individual date components
	dd = Right("00" & Day(dtsnow), 2)
	mm = Right("00" & Month(dtsnow), 2)
	yy = Year(dtsnow)
	hh = Right("00" & Hour(dtsnow), 2)
	nn = Right("00" & Minute(dtsnow), 2)
	ss = Right("00" & Second(dtsnow), 2)

	'Build the date string in the format yyyy-mm-dd
	datevalue = mm & "/" & dd & "/" & yy
	'Build the time string in the format hh:mm:ss
	timevalue = hh & ":" & nn & ":" & ss
	'Concatenate both together to build the timestamp yyyy-mm-dd hh:mm:ss
	dtsvalue = datevalue & " " & timevalue

	ServerDateTime = dtsvalue
End Function

Function RequestGET(url, params)
  Dim tmp
  Dim obj	
	Dim objHttp
	Set objHttp = Server.CreateObject("WinHTTP.WinHTTPRequest.5.1")
	objHttp.open "GET", url, False
	objHttp.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
	objHttp.Send(params)
	tmp = objHttp.responseText
	Set objHttp = Nothing 
	RequestGET = tmp
End Function

Function RequestPOST(url, params)
  Dim tmp
  Dim obj	
	Dim objHttp
	Set objHttp = Server.CreateObject("WinHTTP.WinHTTPRequest.5.1")
	objHttp.open "POST", url, False
	objHttp.setRequestHeader "Content-type", "application/x-www-form-urlencoded"
	objHttp.Send(params)
	tmp = objHttp.responseText
	Set objHttp = Nothing 
	RequestGET = tmp
End Function

%>
