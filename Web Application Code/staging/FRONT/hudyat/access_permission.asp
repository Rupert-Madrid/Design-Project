<style>
	.dashlink {
		font-size: 1em;
	}

	.dashimg {
		width: 60px;
		height: 60px;
	}

	.dashholder td {
		padding: 8px;
	}
</style>
<table>
	<tr valign="top">
		<td>
			<form id="logform">
				<input type="hidden" name="action" value="PINCODE">
				<input type="hidden" name="callback" value="none">
			<table class="dashholder" style="width:100%">
				<!-- <tr>
					<td>UserID:</td>
					<td><input type="text" class="form-control k-input" id="userid" name="userid"></td>
				</tr> -->
				<tr>
					<td>PIN:</td>
					<td><input type="password" class="form-control k-input" id="pincode" name="pincode"></td>
				</tr>
				<tr>
					<td colspan="2"><button class="k-button btn-block" type="button" id="submitbtn"> Submit</button></td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
</table>

<script>
	$(document).ready(function() {
		$('#submitbtn').click(function(){
			displayLoading($('body'));
			var form = $('#logform').serialize();
			var module = store.get('access_module');
			var mysession = deserialize(Cookies.get(global_config.cookie));
			$.post(global_config.systemapi_url + '/AccessPermission.ashx?branch='+mysession.branch,form).always(function(data) {
					
				if(data.length>0){
					$.each(data, function(k,v){
						if (v.Level.toUpperCase() !=='INVOICE' && module=='SJ-VOID'){
							bootbox.alert('Access Denied!');
							return;
						}
						if (v.Level.toUpperCase() =='INVOICE' && module!=='SJ-VOID' && module !== 'SJ-EDIT'){
							bootbox.alert('Access Denied!');
							return;
						}
						if((v.Level.toUpperCase() =='ADMIN' || v.Level.toUpperCase() =='SYSTEM ADMIN'|| v.Level.toUpperCase() =='OWNER') || (v.Level.toUpperCase() =='INVOICE' && module=='SJ-VOID')  || module=='SO-EDIT'){
							store.set('username',v.UserName);
							$('body').trigger('access_granted');
							$('#logform').trigger('reset');
							$('#access_form').data('kendoWindow').close();
						}else{
							bootbox.alert('Access Denied!');
						}
					});
					
				}else{
					bootbox.alert('Invalid! Check your login credentials.');
				}
			hideLoading($('body'));
			});
		});
		$('#logform').on('submit', function(e) { 
        	e.preventDefault();  //prevent form from submitting
        	$('#submitbtn').click();
    	});
	});
</script>