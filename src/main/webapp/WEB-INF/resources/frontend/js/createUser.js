var userValidator = function() {
    var handleSubmit = function() {
        $('#userForm').validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : false,
            rules : {
            	username: {
            		required : true,
                    maxlength: 16
            	},
            	displayName : {
                    required : true,
                    maxlength: 36
                },
                email : {
                	email:true,
                	maxlength: 50
                },
                orgType : {
                    maxlength: 30
                },
                userLocale : {
                    maxlength: 10
                },
                newPwd : {
                	required : true,
                	minlength: 6,
                	maxlength: 16
                },
                confirmNewPwd : {
                	required : true,
                    equalTo: "#newPwd"
                }
            },
            messages : {
            	username : {
                    required : "Username is required.",
                    maxlength : "Username can't be more than 16 bytes."
                },
                displayName : {
                    required : "Display name is required.",
                    maxlength : "Display name can't be more than 36 bytes."
                },
                email : {
                	email: "Please enter a valid email address.",  
                	maxlength : "Email can't be more than 50 bytes."
                },
                orgType : {
                	maxlength : "Org type can't be more than 30 bytes."
                },
                userLocale : {
                	maxlength : "Locale can't be more than 10 bytes."
                },
                newPwd : {
                	required : "Password is required.",
                    minlength : "Password can't be less than 6 bytes.",
                    maxlength : "Password can't be more than 16 bytes."
                },
                confirmNewPwd : {
                	required : "Please re-type new password.",
                    equalTo : "Please enter the same password."
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
                //form.submit();
            	$.ajax({
                    type: 'post',
                    url: '../ajax/saveUser.action',
                    data: $(form).serialize(),
                    dataType : 'json'
                })
                .done(function (response) {
                    if (response == 'S') {               
                        window.location.href = "listUsers.action";                       
                    } else {
                        var $a = $('#alert');
                        $a.find('#alertContent').text(response);
                        if($a.hasClass('hidden')){
                        	$a.removeClass('hidden');
                        }                      
                    }
                });
                return false; 
            }
        });

        $('#userForm input').keypress(function(e) {
            if (e.which == 13) {
            	var uf = $('#userForm');
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

	userValidator.init();
	
	$('#cancelButton').bind('click', function(e) {
		window.location.href = "listUsers.action";
	});
});

