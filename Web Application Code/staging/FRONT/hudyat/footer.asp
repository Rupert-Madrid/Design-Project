	<% If FooterIndicator = True Then %>
		<div class="icon-bar" style="display:none;" onclick="toggleBottomBar()">
			<div id="myiconbar">
				<i class="fa fa-arrow-up fa-2x" style="color:darkblue;"></i>
			</div>
		</div>
    <div class="footer footer-indicator">
        <table id="tblfooter" style="width:95%;margin-left: 10px;margin-right: 10px;">
          <tr>
              <td><button type="button" class="k-button hide" onclick="toggleBottomBar()"><i class="fa fa-close"></i></button>&nbsp;&nbsp;</td>
              <td>Username: <span class="fusername indicator"><% Write(user_name) %></span></td>
              <td>Level: <span class="fuserlevel indicator"><% Write(user_level) %></span></td>
              <!--<td>Logged Date: <span class="floggeddate indicator"></span></td>-->
              <td>&nbsp;</td>
              <td>Server Date: <span class="fsystemdate indicator"></span></td>
              <td>Number Active User(s): <span class="factiveuser indicator"></span></td>
          </tr>
        </table>
    </div>
  <% End If %>

  <style>
  .k-dialog .k-window-titlebar .k-dialog-title {
        display: none;
  }
	.k-window-actions > a.k-button.k-bare.k-button-icon.k-window-action {
    color: #7e8299 !important;
    border-color: #f5f8fa !important;
    background-color: #f5f8fa !important;
	}
  </style>
  <!-- Scripts libraries-->
  <script src="libraries/store.min.js"></script>
  <script src="libraries/bootstrap-3.3.7/js/bootstrap.min.js"></script>
  <script src="libraries/jqueryvalidation/jquery.validate.min.js"></script>
  <script src="libraries/jqueryvalidation/additional-methods.min.js"></script>
  <script src="libraries/moment.min.js"></script>
  <script src="libraries/numeral.min.js"></script>
  <script src="libraries/alertifyjs/alertify.min.js"></script>
  <script src="libraries/select2/js/select2.min.js"></script>
  <script src="libraries/bootbox.min.js"></script>
  <script src="libraries/js.cookie.min.js"></script>
  <script src="libraries/form/jquery.form.min.js"></script>
  <script src="libraries/jstree/jstree.min.js"></script>
  <script src="libraries/draggabilly.pkgd.min.js"></script>
  <script src="libraries/jquery-ui.min.js"></script>
  <script src="libraries/esignature/js/jquery.signature.js"></script>
  <script src="libraries/jquery.ba-dotimeout.min.js"></script>
	<script type="text/javascript" src="libraries/esignature/js/jquery.ui.touch-punch.min.js"></script>
  <script src="global.js?t=<% Write(nocache_time) %>"></script>
	<script src="libraries/jquery.qrcode.min.js"></script>
  <!-- Core theme JS-->
  <!-- <script src="new_layout/js/scripts.js"></script> -->
</body>
</html>