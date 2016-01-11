var columnDnMax = 24;
var columnUnMax = 16;
var columnOrgMax = 10;

$(document)
		.ready(
				function() {

					var currRow = null;

					var oTable = $("#user_table")
							.DataTable(
									{
										"bJQueryUI" : false,
										"bPaginate" : true,
										"bFilter" : true,
										"bLengthChange" : true,
										"aLengthMenu" : [ 10, 15, 20 ],
										"iDisplayLength" : 10,
										"bSort" : false,
										// "aaSorting": [[1, "desc"]],
										"bInfo" : true,
										"bWidth" : true,
										"bScrollCollapse" : true,
										"sPaginationType" : "full_numbers",
										"bProcessing" : true,
										"bServerSide" : true,
										"bDestroy" : true,
										"bSortCellsTop" : true,
										"sDom" : '<"toolbar">frtip',//'T<"clear">lfrtip',
										"oTableTools": {
											"sRowSelect" : "single"
								        },
										"sAjaxSource" : 'ajax/ajaxListUsers.action',
										"aoColumns" : [
												{
													"mData" : "index",
													"sClass" : 'left',
													"sWidth" : "8px"
												},
												{
													"mData" : "username",
													"sClass" : 'left',
													"sWidth" : "110px",
													"mRender" : function(data) {
														if (data != null) {
															data = data.length > columnUnMax ? data
																	.substr(0,
																			columnUnMax)
																	+ '...'
																	: data;
														}
														return data;
													}
												},
												{
													"mData" : "displayName",
													"sWidth" : "170px",
													"sClass" : 'left',
													"mRender" : function(data) {
														if (data != null) {
															data = data.length > columnDnMax ? data
																	.substr(0,
																			columnDnMax)
																	+ '...'
																	: data;
														}
														return data;
													}
												},
												{
													"mData" : "roles",
													"sWidth" : "50px",
													"sClass" : 'left'
												},
												{
													"mData" : "email",
													"sClass" : 'left'
												},
												{
													"mData" : "orgKey",
													"sWidth" : "80px",
													"sClass" : 'left',
													"mRender" : function(data) {
														if (data != null) {
															data = data.length > columnOrgMax ? data
																	.substr(0,
																			columnOrgMax)
																	+ '...'
																	: data;
														}
														return data;
													}
												},
												{
													"mData" : "locale",
													"sWidth" : "80px",
													"sClass" : 'left',
													"mRender" : function(data) {
														if (data != null) {
															data = data.length > columnOrgMax ? data
																	.substr(0,
																			columnOrgMax)
																	+ '...'
																	: data;
														}
														return data;
													}
												},
												{
													"mData" : "id",
													"sWidth" : "140px",
													"mRender" : function(data) {
														var str = '<input type="button" class="btn btn-default btn-xs updateButton" value="Authorization"/>'
																+ '&nbsp;&nbsp;&nbsp;&nbsp;'
																+ '<input type="button" class="btn btn-default btn-xs deleteButton" value="Delete"/>';
														return str;
													}
												} ],
										"fnServerData" : function(sSource,
												aoData, fnCallback) {
											$.ajax({
												"type" : 'post',
												"url" : sSource,
												"dataType" : "json",
												"data" : {
													aoData : JSON
															.stringify(aoData)
												},
												"success" : function(resp) {
													fnCallback(resp);
												}
											});

										}
									});
					
					$('#user_table_filter input').unbind();
					$('#user_table_filter input').bind('keyup', function(e) {
						if (e.keyCode == 13) {
							oTable.search(this.value).draw();
						}
					});
					
					$("div.toolbar").html('<input type="button" id="newUser" value="Create User" class="btn btn-default"/>');
					
					$('#user_table tbody').on(
							'click',
							'input.deleteButton',
							function() {
								currRow = oTable.row($(this).parents('tr'));
								var data = currRow.data();
								var dc = $('#deleteConfirm');
								dc.find('#currId').val(data['id']);
								dc.modal('show');
							}).on('click', 'input.updateButton', function() {
								currRow = oTable.row($(this).parents('tr'));
								var data = currRow.data();
								// var logType = data['logType'];
								/*
								 * if (typeof logType != undefined && logType ==
								 * 'SUCCESS') { view(data); } else { viewLog(data); }
								 */
								viewUser(data);

					});
					
					$('#newUser').bind('click', function(e) {
						//form clear
						window.location.href = "createUser.action";					
					});
					
					$('#delete_ok').bind('click', 
							function(event) {
								event.preventDefault();
								$('#deleteConfirm').modal('hide');
								$.ajax({
									url : "ajax/deleteUser.action",
									dataType : "json",
									data : {
										"id" : $('#deleteConfirm #currId')
												.val()
									},
									type : "POST",
									success : function(data) {
										if (data != null && data == 'true') {
											currRow.remove().draw(false);
										} else {
											alert("delete fail");
										}
									},
									error : function() {
										alert("delete error");
									}
								});

							});
					
					$('#auth_ok').bind('click', 
							function(event) {
								event.preventDefault();
								$('#view').modal('hide');
								$.ajax({
									url : "ajax/authUser.action",
									dataType : "json",
									data : {
										"id" : $('#userId').val(),
										"roles": $('input:radio[name=roles]:checked').val()
									},
									type : "POST",
									success : function(data) {
										if (data != null && data == 'true') {
											currRow.remove().draw(false);
										} else {
											alert("authentication fail");
										}
									},
									error : function() {
										alert("authentication error");
									}
								});

							});
					
				});


function viewUser(d) {
	$.ajax({
		url : "ajax/viewUser.action",
		dataType : "json",
		data : {
			"id" : d['id']
		},
		type : "POST",
		success : function(data) {
			//$(this).text(data[index]);
			$('#userId').val(data['id']);
			$('span#unSpan').text(data['username']);
			$('span#dnSpan').text(data['displayName']);
			var roles = data['roles'];
			var $radios = $('input:radio[name=roles]');
			if(roles.length > 0){
				var arr = roles.split(",");
				for(var s in arr){
					if(arr[s] != ""){
						var str = '[value=' + arr[s] + ']';
						$radios.filter(str).prop('checked', true);
					}					
				}				
			}
		    
			$('#view').modal('show');
		},
		error : function() {
			alert("Get user data error.");
		}
	});

};
