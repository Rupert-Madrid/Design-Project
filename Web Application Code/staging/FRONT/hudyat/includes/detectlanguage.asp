<%
' File: detectlanguage.asp
' Date         Modified By    Purpose
' 08/04/18     Joven          Create file

lang_asp = "en"
If (Request.Querystring("lang").Count <> 0) Then
    lang_asp = Request.Querystring("lang")
End If

If (lang_asp = "jp") Then  %>
      <!--#include file="language/jp.asp"-->
<% 
ElseIf (lang_asp = "ch") Then  %>
    <!--#include file="language/ch.asp"-->
<% 
ElseIf (lang_asp = "kr") Then  %>
      <!--#include file="language/kr.asp"-->
<%
Else %>
      <!--#include file="language/en.asp"-->
<% 
End If  %>