var columnVersionMax = 30;
var columnFileNameMax = 26;
var columnDescMax = 60;

$(document)
		.ready(
				function() {

					$('#myTabs a').click(function(e) {
						e.preventDefault();
						$(this).tab('show');
					})

					var currRow = null;
					var isAdmin = $('#isAdmin').length > 0?true:false;

					var oTable = $('#refresh_table')
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
										"bInfo" : true,// Showing 1 to 10 of 23
										// entries
										"bWidth" : true,
										// "sScrollY": "62%",
										// "sScrollX": "210%",
										"bScrollCollapse" : true,
										"sPaginationType" : "full_numbers",
										"bProcessing" : true,
										"bServerSide" : true,
										"bDestroy" : true,
										"bSortCellsTop" : true,
										"sDom" : 'T<"clear">lfrtip',
										"oTableTools" : {
											"sRowSelect" : "single"
										},
										"sAjaxSource" : 'ajax/ajaxListDataloads.action',
										"aoColumns" : [
												{
													"mData" : "dataloadVersion",
													'sClass' : 'left',
													"sWidth" : "200px",
													"mRender" : function(data,
															data2) {
														if (data != null) {
															return data.length > columnVersionMax ? data
																	.substr(0,
																			columnVersionMax)
																	+ '...'
																	: data;
														}
														return data;

													}
												},
												{
													"mData" : "fileName",
													'sClass' : 'left',
													"sWidth" : "170px",
													"mRender" : function(data,
															data2) {
														if (data != null) {
															var str = data.length > columnFileNameMax ? data
																	.substr(0,
																			columnFileNameMax)
																	+ '...'
																	: data;
															return '<a href="javascript:void(0)" onclick="downloadFile(\''
																	+ data
																	+ '\')">'
																	+ str
																	+ '</a>'; //
														}
														return data;
													}
												},
												{
													"mData" : "processStatus",
													"sWidth" : "100px",
													'sClass' : 'left'
												},
												{
													"mData" : "description",
													'sClass' : 'left',
													"mRender" : function(data,
															data2) {
														if (data != null) {
															data = data.length > columnDescMax ? data
																	.substr(0,
																			columnDescMax)
																	+ '...'
																	: data;
														}
														return data;
													}
												},
												{
													"mData" : "registerDate",
													"sWidth" : "120px",
													'sClass' : 'left'
												},
												{
													"mData" : "id",
													"sWidth" : isAdmin?"95px":"45px",
													"mRender" : function(data) {														
														var str = '<input type="button" class="btn btn-default btn-xs viewButton" value="View"/>';
														if(isAdmin){
															str += '&nbsp;&nbsp;&nbsp;&nbsp;'
															+ '<input type="button" class="btn btn-default btn-xs deleteButton" value="Delete"/>';
														}																
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

					$('#refresh_table tbody').on(
							'click',
							'input.deleteButton',
							function() {
								currRow = oTable.row($(this).parents('tr'));
								var data = currRow.data();
								var dc = $('#deleteConfirm');
								dc.find('#currId').val(data['id']);
								dc.find('#currVersion').val(
										data['dataloadVersion']);
								dc.modal('show');
							}).on('click', 'input.viewButton', function() {
								currRow = oTable.row($(this).parents('tr'));
								var data = currRow.data();
								// var logType = data['logType'];
								/*
								 * if (typeof logType != undefined && logType ==
								 * 'SUCCESS') { view(data); } else { viewLog(data); }
								 */
								viewLog(data, logTable, refreshLogTable);

					});

					$('#refresh_table_filter input').unbind();
					$('#refresh_table_filter input').bind('keyup', function(e) {
						if (e.keyCode == 13) {
							oTable.search(this.value).draw();
						}
					});

					$('#delete_ok').click(
							function(event) {
								event.preventDefault();
								$('#deleteConfirm').modal('hide');
								$.ajax({
									url : "ajax/ajaxDeleteRefresh.action",
									dataType : "json",
									data : {
										"id" : $('#deleteConfirm #currId')
												.val(),
										"version" : $(
												'#deleteConfirm #currVersion')
												.val()
									},
									type : "POST",
									success : function(data) {
										if (data != null && data == 'S') {
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

					var logTable = $('#log_table').DataTable({
						"bJQueryUI" : false,
						"bPaginate" : true,
						"bFilter" : false,
						"bLengthChange" : false,
						// "aLengthMenu" : [ 10, 15, 20 ],
						"iDisplayLength" : 5,
						"bSort" : false,
						"bInfo" : true,
						"bWidth" : true,
						"bScrollCollapse" : true,
						"sPaginationType" : "full_numbers",
						"bProcessing" : true,
						"bServerSide" : true,
						"bDestroy" : true,
						"bSortCellsTop" : true,
						"sAjaxSource" : 'ajax/ajaxListLogs.action',
						"iDeferLoading" : 0,
						"aoColumnDefs" : [ {
							"mData" : "index",
							"sWidth" : "8px",
							'sClass' : 'left',
							"aTargets" : [ 0 ]
						}, {
							"mData" : "type",
							"sWidth" : "30px",
							'sClass' : 'left',
							"aTargets" : [ 1 ]
						}, {
							"mData" : "record",
							"sWidth" : "110px",
							'sClass' : 'left',
							"aTargets" : [ 2 ]
						}, {
							"mData" : "description",
							'sClass' : 'left',
							"aTargets" : [ 3 ]
						}, {
							"mData" : "timestamp",
							"sWidth" : "120px",
							'sClass' : 'left',
							"aTargets" : [ 4 ]
						} ],
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$.ajax({
								"type" : 'post',
								"url" : sSource,
								"dataType" : "json",
								"data" : {
									id : $('#dataloadId').val(),
									version : $('#dataloadVersion').val(),
									beginDate : $('#dlBeginDate').val(),
									endDate : $('#dlEndDate').val(),
									aoData : JSON.stringify(aoData)
								},
								"success" : function(resp) {
									fnCallback(resp);
								}
							});
						}
					});

					var refreshLogTable = $('#refresh_log_table').DataTable({
						"bJQueryUI" : false,
						"bPaginate" : true,
						"bFilter" : false,
						"bLengthChange" : false,
						"iDisplayLength" : 5,
						"bSort" : false,
						"bInfo" : true,
						"bWidth" : true,
						"bScrollCollapse" : true,
						"sPaginationType" : "full_numbers",
						"bProcessing" : true,
						"bServerSide" : true,
						"bDestroy" : true,
						"bSortCellsTop" : true,
						"sAjaxSource" : 'ajax/ajaxListRefreshLogs.action',
						"iDeferLoading" : 0,
						"aoColumnDefs" : [ {
							"mData" : "index",
							"sWidth" : "8px",
							'sClass' : 'left',
							"aTargets" : [ 0 ]
						}, {
							"mData" : "type",
							"sWidth" : "30px",
							'sClass' : 'left',
							"aTargets" : [ 1 ]
						}, {
							"mData" : "description",
							'sClass' : 'left',
							"aTargets" : [ 2 ]
						}, {
							"mData" : "timestamp",
							"sWidth" : "120px",
							'sClass' : 'left',
							"aTargets" : [ 3 ]
						} ],
						"fnServerData" : function(sSource, aoData, fnCallback) {
							$.ajax({
								"type" : 'post',
								"url" : sSource,
								"dataType" : "json",
								"data" : {
									id : $('#dataloadId').val(),
									refreshBeginDate : $('#refreshBeginDate').val(),
									refreshEndDate : $('#refreshEndDate').val(),
									aoData : JSON.stringify(aoData)
								},
								"success" : function(resp) {
									fnCallback(resp);
								}
							});
						}
					});

				});

function viewLog(d, logTable, refreshLogTable) {
	$.ajax({
		url : "ajax/ajaxViewRefresh.action",
		dataType : "json",
		data : {
			"id" : d['id']
		},
		type : "POST",
		success : function(data) {
			$('form#dataloadForm').find('span.form-control-static').each(
					function(index) {
						$(this).text(data[index]);
					});

			$('#view').modal('show');

			$('#dataloadId').val(d['id']);
			$('#dataloadVersion').val(d['dataloadVersion']);
			$('#dlBeginDate').val(d['dlBeginDate']);
			$('#dlEndDate').val(d['dlEndDate']);
			$('#refreshBeginDate').val(d['refreshBeginDate']);
			$('#refreshEndDate').val(d['refreshEndDate']);
			logTable.ajax.reload();
			refreshLogTable.ajax.reload();
		},
		error : function() {
			alert("Get Dataload data error.");
		}
	});

};

function downloadFile(fileName) {
	$
			.ajax({
				url : "../ajax/ajaxCheckFileExists.action",
				dataType : "json",
				data : {
					"fileName" : fileName
				},
				type : "POST",
				success : function(data) {
					if (typeof data != undefined && data == 'Y') {
						window.location.href = "download.action?downloadFileName="
								+ fileName;
					} else if (data == 'N') {
						alert(fileName
								+ " does not exist or has been archived.");
					}
				},
				error : function() {
					alert("Check File Exists Error");
				}
			});
}