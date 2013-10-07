define(['backbone', 'vent', 'models/post', 'text!templates/post.html'], function(Backbone, vent, postModel, postTemplate){

	var Module = Backbone.View.extend({
		initialize: function(){
			new blogCanvas();
		}
	});

	var blogCanvas = Backbone.View.extend({
		el: '#postCanvas',
		template: _.template(postTemplate),
		initialize: function(){
			this.model = new postModel();
			this.model.on('sync', this.render, this);
			vent.on('show:post', this.showPost, this);
		},
		showPost: function(post){

			var a = $('#blogPosts .active a').attr('href').replace('#post/', '');
			if(post == a) return false;

			this.$el.animate({
				opacity: 0,
				marginTop: '60px'
			},700, function(){
				this.$el.css('marginTop', '-50px');
				this.model.fetch({data:{p: post}});
				$('#blogPosts .active').removeClass();
				$('#blogPosts a[href$="'+post+'"]').parent().addClass('active');
			}.bind(this));

		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.animate({
				opacity: 1,
				marginTop: 0
			},600);
		}
	});

	return Module;

});