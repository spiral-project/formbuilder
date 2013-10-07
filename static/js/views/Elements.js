define(['backbone', 'text!templates/confirm.html', 'vent', 'models/form', 'text!templates/embed.html'], function(Backbone, ConfirmTemplate, vent, FormModel, embedModal){

    var Module = Backbone.View.extend({
        initialize: function(){
            new deleteMe();
            new embed();
        }
    });

    /*-----------------------------------
    | Confirm Box
    ------------------------------------*/
    var confirm = Backbone.View.extend({
        tagName: 'div',
        className: 'overlay',
        template: _.template(ConfirmTemplate),
        events: {
            'click .confirmButton' : 'confirm',
            'click .cancelButton'  : 'deny'
        },
        initialize: function(){
            this.render(this.options.heading, this.options.message);
        },
        closeOverlay: function(e){
            $('.overlay').remove();
        },
        confirm: function(e){
            e.stopPropagation();
            this.closeOverlay();
            this.trigger('confirm');
            return true;
        },
        deny: function(e){
            e.stopPropagation();
            this.closeOverlay();
            this.trigger('deny');
            return false;
        },
        render: function(heading, message){
            this.$el.html(this.template({
                heading: heading,
                message: message
            }));
            $('body').append(this.el);
        }
    });

    /*-----------------------------------
    | Delete Form
    ------------------------------------*/

    var deleteMe = Backbone.View.extend({
        el: '.deleteForm',
        events:{
            'click': 'deleteForm'
        },
        deleteForm: function(e){
            e.preventDefault();
            var c = new confirm({
                heading: 'Delete Form',
                message: 'Are you sure you want to delete this form? This action cannot be undone.'
            });

            c.on('confirm', function(){

                var form = new FormModel({id: $(e.currentTarget).data('id')});
                form.destroy();

                $(e.currentTarget).parent().parents('li').slideUp(function(){
                    $(this).remove();
                });

            }, this);
        }
    });

    /*-----------------------------------
    | Embed Button
    ------------------------------------*/

    var embed = Backbone.View.extend({
        el: '.embedCode',
        events: {
            'click': 'showModal'
        },
        showModal: function(e){
            e.preventDefault();
            var m = new Modal({secret: $(e.currentTarget).data('key')});
        }
    });

    /*-----------------------------------
    | Embed Modal
    ------------------------------------*/

    var Modal = Backbone.View.extend({
        tagName: 'div',
        className: 'overlay',
        template: _.template(embedModal),
        events: {
            'click .cancelButton': 'close'
        },
        initialize: function(){
            this.render();
        },
        close: function(){
            $('.overlay').remove();
        },
        render: function(){
            this.$el.html(this.template({secret: this.options.secret}));
            $('body').append(this.el);
        }
    });

    return Module;
});