$(function() {
	var validateFile = function() {
		if ($('#file_upload-queue').html() == '') {
			//file hasn't been uploaded
			if (!$('#file_upload_div').hasClass('has-error')) {
				$('#file_upload_div').addClass('has-error');
				$(
						'<span class="help-block-iqm" for="file_upload">Please select a csv file.</span>')
						.insertAfter('#file_upload');
			}
			return false;
		} else {
			$('#file_upload_div').removeClass('has-error');
			$('#file_upload_div .help-block-iqm').remove();
		}
		return true;
	};

	var jump = function() {
		window.location.href = 'viewDataloads.action';
	};

	$('#file_upload').uploadify({
		'debug'    : true,
		'buttonText' : 'Select File',
		'fileObjName' : 'myFile',
		'fileTypeDesc' : 'csv file',
		'fileTypeExts' : '*.csv;',
		'auto' : false,
		'multi' : false,
		'uploadLimit' : 1,
		'swf' : 'resources/opensource/uploadify/uploadify.swf',
		'method': 'post',
		'uploader' : 'ajax/ajaxUpload.action',
		'onDialogClose' : function(queueData) {
			//alert(queueData.filesQueued + ' files were queued of ' + queueData.filesSelected + ' selected files. There are ' + queueData.queueLength + ' total files in the queue.');
			if (queueData.queueLength > 0) {
				validateFile();
			}
		},
		'onUploadStart' : function(file) {
			var desc = $.trim($('#desc').val());
			if(desc == ''){
				desc = 'NoValue';
			}
			$("#file_upload").uploadify("settings", "formData", {
				'username' : $.trim($('#username').val()) + '||' +  desc
			});
		},
		'onUploadSuccess' : function(file, data, response) {
			//alert('upload success');
			jump();
		},
		'onUploadError' : function(file, errorCode, errorMsg, errorString) {
            alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
        }
	});

	$('#submit_form').on('click', function() {
		if ($('.form-horizontal').valid() && validateFile()) {//valid pass					
			$('#file_upload').uploadify('upload');
		}
	});
});
