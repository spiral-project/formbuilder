define(['backbone'], function(Backbone){

    var Module = Backbone.View.extend({
        initialize: function(){
            new submitForm();
            new checkboxes();
            new radio();
        }
    });

    var checkboxes = Backbone.View.extend({
        el: 'input[type=checkbox]',
        events:{
            'click': 'click'
        },
        click: function(e){
            var val = $(e.currentTarget).val();
            var array = $.parseJSON($(e.currentTarget).parent().siblings('input[type=hidden]').val());

            // If in array remove it

            if($.inArray(val, array) > -1){
                array.splice(array.indexOf(val), 1);
            } else {
                array.push(val);
            }

            array = JSON.stringify(array);
            $(e.currentTarget).parent().siblings('input[type=hidden]').val(array);
        }
    });

    var radio = Backbone.View.extend({
        el: 'input[type=radio]',
        events:{
            'click': 'click'
        },
        click: function(e){
            var val = $(e.currentTarget).val();
            $(e.currentTarget).parent().siblings('input[type=hidden]').val(val);
        }
    });

    var submitForm = Backbone.View.extend({
        el: '.submitForm',
        events: {
            'click': 'submitForm'
        },
        submitForm: function(e){
            e.preventDefault();

            // First of all let's validate the required fields

            var errors = 0;

            $('.requiredField').each(function(){
                errors++;
                if($(this).val() == ''){
                    $(this).parents('.control-group').addClass('error');
                } else {
                    $(this).parents('.control-group').removeClass('error');
                    errors--;
                }
            });

            if(errors > 0) return false;

            // Assemble what we're gonna post to the server

            var fields = {};
            $('input[type=text], input[type=hidden], select, textarea').each(function(){
                fields["field-"+$(this).data('field')] = $(this).val();
            });

            $('#formFields').slideUp(function(){
                $('#loadingDiv').slideDown();
            });

            var url = 'http://former.io/f/'+$('body').data('form');

            $.post(url, fields, function(data){
                $('#loadingDiv h1').text(data);
            });

        }
    });

    return Module;

});