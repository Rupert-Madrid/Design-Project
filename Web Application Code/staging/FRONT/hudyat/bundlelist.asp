<!--#include file="head.asp"-->

<div class="container-fluid fixeddiv">

	<div class="global-form">
		<div class="row">
			<div class="col-lg-2 col-xs-4">
				<button type="button" class="k-button btn-block" id="product_browse"><span class="fa fa-plus"></span>&nbsp;Add Hotline</button>	
			</div>
			<div class="col-lg-2 col-xs-4">
				<button type="button" class="k-button btn-block" id="btnsave"><span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;Save</button>	
			</div>
		</div>
		<div id="grid">
		</div>
	</div>
	<!-- end: .container -->

	<script src="bundlelist.js?t=<% Write(nocache_time) %>"></script>
	<% FooterIndicator = False %>

		<!--#include file="footer.asp"-->