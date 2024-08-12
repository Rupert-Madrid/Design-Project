<%

If Session("access_granted") = "true" Then
    user_isloggedin = "true"
End If

Select Case GetPageName()
    Case "/login.asp":
        If user_isloggedin <> "" Then
            Response.Redirect("index.asp")
        End If
    Case "/index.asp"
        If user_isloggedin = "" Then
            Response.Redirect("login.asp")
        End If
    Case "/logout.asp":
        If user_isloggedin <> "" Then
            Response.Redirect("index.asp")
        End If
Case Else
    
End Select

%>