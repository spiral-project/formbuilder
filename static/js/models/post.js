define(['backbone'], function(Backbone){
	var model = Backbone.Model.extend({
		urlRoot: '/blog/post'
	});
	return model;
});