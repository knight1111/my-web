jQuery.validator.addMethod("notEqual", function(value, element, param) {
  return this.optional(element) || value != $(param).val();
}, "Please specify a different value");

var upValidator = function() {
    var handleSubmit = function() {
        $('#userForm').validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : false,
            rules : {
            	displayName : {
                    required : true,
                    maxlength: 240
                },
                email : {
                	email:true,
                	maxlength: 240
                },
                orgType : {
                    maxlength: 30
                },
                userLocale : {
                    maxlength: 10
                }
            },
            messages : {
            	displayName : {
                    required : "Display name is required.",
                    maxlength : "Display name can't be more than 240 bytes."
                },
                email : {
                	email: "Please enter a valid email address.",  
                	maxlength : "Email can't be more than 240 bytes."
                },
                orgType : {
                	maxlength : "Org type can't be more than 30 bytes."
                },
                userLocale : {
                	maxlength : "Locale can't be more than 10 bytes."
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
                    url: '../ajax/saveUserPreference.action',
                    data: $(form).serialize(),
                    dataType : 'json'
                })
                .done(function (response) {
                    if (response == 'true') {               
                    	showInfo('upInfo', null, true);                     
                    } else {
                    	showInfo('upAlert', null, false);
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

var rpValidator = function() {
    var handleSubmit = function() {
        $('#pwdForm').validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : false,
            rules : {
            	oldPwd : {
                    required : true,
                    maxlength: 16
                },
                newPwd : {
                	required : true,
                	notEqual: "#oldPwd",
                	minlength: 6,
                	maxlength: 16
                },
                confirmNewPwd : {
                	required : true,
                    equalTo: "#newPwd"
                }
            },
            messages : {
            	oldPwd : {
                    required : "Old Password is required.",
                    maxlength : "Old Password can't be more than 16 bytes."
                },
                newPwd : {
                	required : "New Password is required.",
                	notEqual: "Please specify a different password.",
                    minlength : "New Password can't be less than 6 bytes.",
                    maxlength : "New Password can't be more than 16 bytes."
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
                    url: '../ajax/resetPassword.action',
                    data: $(form).serialize(),
                    dataType : 'json'
                })
                .done(function (response) {
                    if (response == 'S') {               
                        showInfo('rpInfo', null, true);                   
                    } else {
                    	showInfo('rpAlert', response, false);
                    }
                    
                    //clear form
                    form.reset();
                });
                return false; 
            }
        });

        $('#userForm input').keypress(function(e) {
            if (e.which == 13) {
            	var pf = $('#pwdForm');
                if (pf.validate().form()) {
                    pf.submit();
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

function showInfo(id, msg, hideFlag){
	var hidden = 'hidden';
	var $a = $('#'+id);
	$a.siblings().addClass(hidden);
	if(msg != undefined && msg != null){
		$a.find('span').text(msg);
	}
    //$a.show();
	if($a.hasClass(hidden)){
		$a.removeClass(hidden);
	}
	if(hideFlag == true){
	    setTimeout(function(){
	    	$a.addClass(hidden);
	    }, 3000); 
	}
}

$(document).ready(function() {

	$('#myTabs a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	upValidator.init();
	rpValidator.init();
});

