define(['backbone', 'models/stats', 'models/refer'], function(Backbone, StatsModel, ReferModel){

	var Module = Backbone.View.extend({
		initialize: function(){
			if($('#formStats').length > 0) new stats();
		}
	});

	window.stats = Backbone.View.extend({
		initialize: function(){
			this.visitors = new StatsModel();
			this.visitors.on('sync', this.render, this);

			this.refer = new ReferModel();
			this.refer.on('sync', this.render, this);

			var params = {
				data:{
					api_key: 'FMH19BQ6KBRIFDPF',
					site_token: 'GSN-761144-G',
					page: $('.formStats').data('uri')
				}
			};
			this.visitors.fetch(params);
			this.refer.fetch(params);
			setInterval(function(){
				this.visitors.fetch(params);
				this.refer.fetch(params);
			}.bind(this), 4000);
		},
		render: function(){
			$('#visitorCount').text(this.visitors.get('cardinality'));
			$('#referCount').text(this.refer.get('cardinality'));
		}
	});

	return Module;

});