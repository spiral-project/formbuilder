define(['backbone'], function(Backbone){
	var model = Backbone.Model.extend({
		urlRoot: '/forms'
	});
	return model;
});