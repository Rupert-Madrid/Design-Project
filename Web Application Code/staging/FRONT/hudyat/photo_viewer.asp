<!--#include file="head.asp"-->
<div class="container-fluid">
<img src="" id="photo_frame" style="width: 100%;"/>
</div>
<% FooterIndicator = False %>
<!--#include file="footer.asp"-->
<script>
	var photo_frame = store.get('photo_frame');
	$('#photo_frame').attr('src',photo_frame);
</script>