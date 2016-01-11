var MyValidator = function() {
    var handleSubmit = function() {
        $('.form-horizontal').validate({
            errorElement : 'span',
            errorClass : 'help-block',
            focusInvalid : false,
            rules : {
            	username : {
                    required : true,
                    maxlength: 15
                },
                file1 : {
                    required : true,
                    extension : 'csv',
                    accept : 'text/csv,text/comma-separated-value,application/vnd.ms-excel,application/vnd.msexcel,application/csv'
                },
                description : {
                    /*required : true,*/
                    maxlength: 80
                }
            },
            messages : {
            	username : {
                    required : "Version name is required.",
                    maxlength : "Version name can't be more than 15 bytes."
                },
                file1 : {
                    required : "A csv file is required.",
                    extension : "Please select a csv file.",
                    accept : "Please select a csv file."
                },
                description : {
                    /*required : "Description is required.",*/
                    maxlength : "Description can't be more than 80 bytes."
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
                form.submit();
            }
        });

        $('.form-horizontal input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.form-horizontal').validate().form()) {
                    $('.form-horizontal').submit();
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

MyValidator.init();