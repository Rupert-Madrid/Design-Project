<!--#include file="head.asp"-->
<link rel="stylesheet" href="accessible_modules.css?t=<% Write(nocache_time) %>" />
<div class="container-fluid">
	<div class="row" style="padding:9px">
		<div class="col-xs-8">
			<label class="text-right main_menu_label"><span class='fa fa-user main_menu_icon'></span>&nbsp;&nbsp;Set User Rights</label>
		</div>
		<div class="col-xs-3">
			<input id='search' class='k-textbox'  style="width:100%" autocomplete="off" placeholder="Search"/>
		</div>
		<div class="col-xs-1" style="padding-left: 0px;">
			<button type="button" class="k-button btn-block" onclick="saverights()">
				<i class="fa fa-save"></i>&nbsp;Save
			</button>
		</div>
	</div>
  <!-- <div id="recordcount" class="text-right"></div> -->
    <div id="grid"></div>
</div>
  <script src="accessible_modules.js?t=<% Write(nocache_time) %>"></script>
  <% FooterIndicator = False %>
  <!--#include file="footer.asp"-->