var loginValidator = function() {
	var handleSubmit = function() {
		$('#loginForm').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				username : {
					required : true,
					maxlength : 16
				},
				password : {
					required : true,
					maxlength : 16
				}
			},
			messages : {
				username : {
					required : "Username is required.",
					maxlength : "Username can't be more than 16 bytes."
				},
				password : {
					required : "Password is required.",
					maxlength : "Password can't be more than 16 bytes."
				}
			},

			highlight : function(element) {
				$(element).closest('.form-group').addClass('has-error');
			},

			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},

			errorPlacement : function(error, element) {
				element.parent('div').append(error);
			},

			submitHandler : function(form) {
				$.ajax({
					type : 'post',
					url : 'ajax/authentication.action',
					data : {
						"username" : $('#username').val(),
						"password" : $('#password').val()//$.md5($('#password').val())
					},
					dataType : 'json'
				}).done(function(response) {
					if (response != null) {
						if (response.username == 'N') {
							var $a = $('#alert');
							if ($a.hasClass('hidden')) {
								$a.removeClass('hidden');
							}
						} else {
							window.location.href = "edf/index.action";
						}
					}
				});
				return false;
			}
		});

		$('#loginForm input').keypress(function(e) {
			if (e.which == 13) {
				var uf = $('#loginForm');
				if (uf.validate().form()) {
					uf.submit();
				}
				return false;
			}
		});
	}
	return {
		init : function() {
			handleSubmit();
		}
	};

}();

$(document).ready(function() {

	loginValidator.init();

});
