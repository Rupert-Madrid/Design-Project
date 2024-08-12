<!--#include file="head.fileupload.asp"-->

<style>
	.dropZoneElement {
		position: relative;
		display: inline-block;
		background-color: #f8f8f8;
		border: 1px solid #c7c7c7;
		width: 230px;
		height: 110px;
		text-align: center;
	}

	.textWrapper {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		font-size: 24px;
		line-height: 1.2em;
		font-family: Arial,Helvetica,sans-serif;
		color: #000;
	}

	.dropImageHereText {
		color: #c7c7c7;
		text-transform: uppercase;
		font-size: 12px;
	}

	.product {
		float: left;
		position: relative;
		margin: 0 10px 10px 0;
		padding: 0;
	}
	.product img {
		width: 110px;
		height: 110px;
	}

	.wrapper:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.k-upload-button{
		width:100% !important;
		height: 260px !important;
	}
</style>

<%
'Validated required parameters
Dim aready
Dim module_code
Dim refno
module_code = ""
refno = ""
aready = True

If Request.QueryString("module_code") = "" Then
	aready = False
ElseIf Request.QueryString("refno") = "" Then
	aready = False
End If
If aready = False Then
	Response.Write("required parameters")
	Response.End
End If

module_code = Request.QueryString("module_code")
refno = Request.QueryString("refno")
%>

<body>
	<input type="hidden" id="module_code" name="module_code" value="<% Write(module_code) %>">
	<input type="hidden" id="refno" name="refno" value="<% Write(refno) %>">
	<div class="container-fluid">
			<span><b>Code:</b><% Write(module_code) %> <b>Reference:</b><% Write(refno) %> <b id="uploadmode"></b></span><br>
			<input type="file" name="files" id="myfiles" />
	</div>
	<div class="alert alert-success">
		<b>Upload Restrictions:</b>
		<ul>
			<li>Server only allowed this file formats ".jpg", ".jpeg",".png", ".xps", ".pdf", ".txt", ".xlsx", ".xls", ".doc", ".docx"</li>
			<li>Maximum file size should not exceed 10 MB (Mega Bytes)</li>
			<li>Minimum file size should not be less than 1 KB (Kilo Bytes)</li>
		</ul>
	</div>

	<script src="fileupload.js?t=<% Write(nocache_time) %>"></script>	
</body>
</html>
