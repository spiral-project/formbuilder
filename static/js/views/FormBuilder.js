define(['backbone', 'vent', 'text!templates/popoverTemplate.html', 'models/form'], function(Backbone, vent, popoverTemplate, formModel){

    /*-----------------------------------
    | Module
    ------------------------------------*/

    var Module = Backbone.View.extend({
        initialize: function(){
            new polyfill();
            new body();
            window.c = new canvas();
            new elements();
            new canvasElements();
            new saveForm();
            new w();
        }
    });

    /*-----------------------------------
    | Window
    ------------------------------------*/

    var w = Backbone.View.extend({
        el: window,
        events:{
            'scroll': 'sideBarFollow'
        },
        sideBarFollow: function(e){
            if(this.$el.scrollTop() > 85){
                $('#formOptions').css({
                    position: 'fixed',
                    top: '15px',
                    left: '50%',
                    marginLeft: '-470px'
                });
            } else {
                $('#formOptions').css({
                    position: 'static',
                    top: 'auto',
                    left: 'auto',
                    marginLeft: 0
                });
            }
        }
    });

    /*-----------------------------------
    | Polyfill for array move
    ------------------------------------*/

    var polyfill = Backbone.View.extend({
        initialize: function(){
            Array.prototype.move = function (old_index, new_index) {
                while (old_index < 0) {
                    old_index += this.length;
                }
                while (new_index < 0) {
                    new_index += this.length;
                }
                if (new_index >= this.length) {
                    var k = new_index - this.length;
                    while ((k--) + 1) {
                        this.push(undefined);
                    }
                }
                this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            };
        }
    });

    /*-----------------------------------
    | Body
    ------------------------------------*/

    var body = Backbone.View.extend({
        el: document,
        events: {
            'click' : 'click'
        },
        click: function(){
            vent.trigger('close:popover');
        }
    });

    /*-----------------------------------
    | Elements
    ------------------------------------*/

    var elements = Backbone.View.extend({
        el: '#elements',
        events:{
            'dragstart li': '_dragStartEvent',
            'click li': 'click'
        },
        _dragStartEvent: function(e){
            window._backboneDragDropObject = $(e.currentTarget);
        },
        click: function(e){
            this._dragStartEvent(e);
            window.c.drop(window._backboneDragDropObject, e);
        }
    });

    /*-----------------------------------
    | Canvas
    ------------------------------------*/

    var canvas = Backbone.View.extend({
        el: '#canvas',
        events:{
            'dragover': '_dragOverEvent',
            'dragenter': '_dragEnterEvent',
            'dragleave': '_dragLeaveEvent',
            'drop': '_dropEvent'
        },
        _draghoverClassAdded: false,
        
        _dragOverEvent: function (e) {
            if (e.originalEvent) e = e.originalEvent
            var data = this._getCurrentDragData(e)

            if (this.dragOver(data, e.dataTransfer, e) !== false) {
                if (e.preventDefault) e.preventDefault()
                e.dataTransfer.dropEffect = 'copy' // default
            }
        },

        _dragEnterEvent: function (e) {
            if (e.originalEvent) e = e.originalEvent
            if (e.preventDefault) e.preventDefault()
        },

        _dragLeaveEvent: function (e) {
            if (e.originalEvent) e = e.originalEvent
            var data = this._getCurrentDragData(e)
            this.dragLeave(data, e.dataTransfer, e)
        },

        _dropEvent: function (e) {

            if (e.originalEvent) e = e.originalEvent;
            if (e.preventDefault) e.preventDefault();
            if (e.stopPropagation) e.stopPropagation();

            var data = window._backboneDragDropObject;

            if (this._draghoverClassAdded) this.$el.removeClass("draghover");
            this.drop(data, e);
        },

        _getCurrentDragData: function (e) {
            var data = null;
            if (window._backboneDragDropObject) data = window._backboneDragDropObject;
            return data;
        },

        dragOver: function (data, dataTransfer, e) {
            this.$el.addClass("draghover")
            this._draghoverClassAdded = true
        },

        dragLeave: function (data, dataTransfer, e) {
            if (this._draghoverClassAdded) this.$el.removeClass("draghover")
        },

        getElement: function(type){

            var element,
            boilerplate = _.template('<div class="control-group component"><label class="control-label">Label</label><div class="controls"><%= element %></div></div>');

            switch(type){
                case 'textbox':
                    element = '<input type="text"></input>';
                    return boilerplate({element: element});
                    break;
                case 'textarea':
                    element = '<textarea></textarea>';
                    return boilerplate({element: element});
                    break;
                case 'submit':
                    return '<div class="form-actions component"><button class="btn btn-primary">Label</button></div>';
                    break;
                case 'legend':
                    return '<div class="component"><legend>Label</legend></div>';
                    break;
                case 'select':
                    element = '<select class="dropdown"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>';
                    return boilerplate({element: element});
                    break;
                case 'checkbox':
                    var element = '<label class="checkbox"><input type="checkbox"> Option 1</label><label class="checkbox"><input type="checkbox"> Option 2</label><label class="checkbox"><input type="checkbox"> Option 3</label>';
                    return boilerplate({element: element});
                    break;
                case 'radio':
                    var element = '<label class="radio"><input type="radio"> Option 1</label><label class="radio"><input type="radio"> Option 2</label><label class="radio"><input type="radio"> Option 3</label>';
                    return boilerplate({element: element});
                    break;
                case 'text':
                    return '<div class="component"><p>Label</p></div>';
                    break;
            }
        },

        drop: function (data, e) {
            // Remove the H1
            this.$('h1').remove();
            // Add our markup
            this.$('#canvasElements').append(this.getElement(data.data('type')));
            this.$('#canvasElements .component:last').click();

            // Build the JSON
            var json = $.parseJSON($('#build').val());
            json.push({
                type: data.data('type'),
                text: 'Label',
                required: false,
                options: false
            });
            $('#build').val(JSON.stringify(json));
        }
    });

    /*-----------------------------------
    | Edit Card
    ------------------------------------*/

    var editCard = Backbone.View.extend({
        tagName: 'div',
        className: 'popover left',
        template: _.template(popoverTemplate),
        events:{
            'click' : 'stopProp',
            'keypress input': 'filterKey'
        },
        initialize: function(){
            this.render();
            vent.on('close:popover', this.close, this);
        },
        stopProp: function(e){
            e.stopPropagation();
        },
        filterKey: function(e){
            if(e.which == 13) this.close();
        },
        close: function(){

            // Set the options we just edited
            var label = (this.$('#requiredField').is(':checked')) ? this.$('#editLabel').val() + ' <span class="required">*</span>' : this.$('#editLabel').val();
            this.options.editable.label.html(label);
            this.options.editable.legend.text(this.$('#editLegend').val());
            this.options.editable.submit.text(this.$('#editSubmit').val());
            this.options.editable.paragraph.text(this.$('#editParagraph').val());

            if(this.$('#editOptions').length > 0){
                var p = this.$('#editOptions').val().split(','),
                    o = [];
                _.each(p, function(option){
                    o.push($.trim(option));
                });

                this.html = '';

                if (this.options.editable.select.length > 0){

                    _.each(o, function(option){
                        this.html = this.html+'<option>'+option+'</option>';
                    }, this);
                    this.options.editable.select.html(this.html);

                } else if($(this.options.editable.element).find('.checkbox').length > 0){

                    _.each(o, function(option){
                        this.html = this.html+'<label class="checkbox"><input type="checkbox"> '+option+'</label>';
                    }, this);
                    $(this.options.editable.element).children('.controls').html(this.html);

                } else if($(this.options.editable.element).find('.radio').length > 0){

                    _.each(o, function(option){
                        this.html = this.html+'<label class="radio"><input type="radio"> '+option+'</label>';
                    }, this);
                    $(this.options.editable.element).children('.controls').html(this.html);

                } 

            }

            // Add it to the JSON
            var index = this.$el.parent().index();
            if(index > -1){
                var text, json = $.parseJSON($('#build').val());

                switch(json[index].type){
                    case 'legend':
                        text = this.$('#editLegend').val();
                        required = false;
                        options = false;
                        break;
                    case 'submit':
                        text = this.$('#editSubmit').val();
                        required = false;
                        options = false;
                        break;
                    case 'text':
                        text = this.$('#editParagraph').val();
                        required = false;
                        options = false;
                        break;
                    case 'select':
                        text = this.$('#editLabel').val();
                        required = false;
                        options = this.$('#editOptions').val().split(',');
                        break;
                    case 'radio':
                        text = this.$('#editLabel').val();
                        required = false;
                        options = this.$('#editOptions').val().split(',');
                        break;
                    case 'checkbox':
                        text = this.$('#editLabel').val();
                        required = false;
                        options = this.$('#editOptions').val().split(',');
                        break;
                    default:
                        text = this.$('#editLabel').val();
                        required = (this.$('#requiredField').is(':checked')) ? true : false;
                        options = false;
                        break;
                }

                json[index] = ({
                    type: json[index].type,
                    text: text,
                    required: required,
                    options: options
                });
                $('#build').val(JSON.stringify(json));
            }

            // Now remove and unbind the view
            this.remove();
            this.unbind();
        },
        render: function(){

            var label = this.options.editable.label,
            required = (label.children('.required').length > 0) ? true : false,
            options;

            if(required) label.children('.required').remove();

            if(this.options.editable.select.length > 0){
                options = '';
                this.options.editable.select.children('option').each(function(){
                    options = options + $(this).val()+', ';
                });
            } else if($(this.options.editable.element).find('.radio').length > 0){
                options = '';
                $(this.options.editable.element).find('.radio').each(function(){
                    options = options + $(this).text()+', ';
                });
            } else if($(this.options.editable.element).find('.checkbox').length > 0){
                options = '';
                $(this.options.editable.element).find('.checkbox').each(function(){
                    options = options + $(this).text()+', ';
                });
            }

            options = $.trim(options);
            options = options.replace(/(^,)|(,$)/g, "");

            var editable = {
                label: label.text(),
                legend: this.options.editable.legend.text(),
                submit: this.options.editable.submit.text(),
                paragraph: this.options.editable.paragraph.text(),
                options: options,
                required: required
            };

            this.$el.html(this.template(editable));
            return this;
        }
    });

    /*-----------------------------------
    | Canvas Elements
    ------------------------------------*/

    var canvasElements = Backbone.View.extend({
        el: '#canvasElements',
        events: {
            'click .component': 'edit',
            'mouseenter .component': 'showDelete',
            'mouseleave .component': 'hideDelete',
            'click .deleteBtn': 'deleteElement'
        },
        initialize: function(){
            this.$el.sortable({
                start: function(e, ui){
                    this.oldIndex = $(ui.item).index();
                },
                stop: function(e, ui){
                    this.newIndex = $(ui.item).index();
                    var json = $.parseJSON($('#build').val());
                    json.move(this.oldIndex, this.newIndex);
                    $('#build').val(JSON.stringify(json));
                }
            });
        },
        edit: function(e){

            e.stopPropagation();
            vent.trigger('close:popover');

            var view = new editCard({
                editable:{
                    label: $(e.currentTarget).children('label'),
                    legend: $(e.currentTarget).children('legend'),
                    submit: $(e.currentTarget).children('button'),
                    paragraph: $(e.currentTarget).children('p'),
                    select: $(e.currentTarget).find('select'),
                    element: e.currentTarget
                }
            });

            $(e.currentTarget).append(view.el);

            // Set the correct position

            var offset = $(e.currentTarget).offset();
            var height = this.$('.popover').height();
            var top = offset.top - (height - 8);
            top = ($(e.currentTarget).height() - this.$('.popover').outerHeight())/2 + 4
            this.$('.popover').css('top', top);

            // Focus!!

            this.$('.popover input:first').focus();

        },
        showDelete: function(e){
            $(e.currentTarget).append('<button class="btn btn-link deleteBtn"><i class="icon-remove"></i></button>');
        },
        hideDelete: function(e){
            $(e.currentTarget).children('.deleteBtn').remove();
        },
        deleteElement: function(e){
            e.stopPropagation();
            var c = $(e.currentTarget).parents('.component'),
            i = c.index(),

            // Remove from JSON
            json = $.parseJSON($('#build').val());
            json.splice(i, 1);
            $('#build').val(JSON.stringify(json));

            // Remove the element
            c.slideUp(function(){
                $(this).remove();
            });
        }
    });

    /*-----------------------------------
    | Save Form
    ------------------------------------*/

    var saveForm = Backbone.View.extend({
        el: '#saveForm',
        events: {
            'click': 'save'
        },
        save: function(e){

            vent.trigger('close:popover');

            if($(e.currentTarget).text() != 'Saving...'){
                $(e.currentTarget).addClass('disabled').text('Saving...')
                var model = new formModel({
                    name: $('#formName').val(),
                    fields: $('#build').val()
                });

                if($(e.currentTarget).data('id')) model.id = $(e.currentTarget).data('id');

                model.save(null, {wait: true, success: function(model){

                    var id = model.get('id');

                    this.$el.removeClass('disabled').text('Save Form');
                    this.$el.data('id', id);
                    window.history.replaceState({}, "Former - Edit Form", "/forms/"+id+"/edit");

                }.bind(this)});
            }
        }
    });

    return Module;

});