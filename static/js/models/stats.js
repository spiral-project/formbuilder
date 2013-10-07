define(['backbone'], function(Backbone){
	var model = Backbone.Model.extend({
		urlRoot: 'https://api.gosquared.com/latest/visitors/'
	});
	return model;
});