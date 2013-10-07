define(['backbone'], function(Backbone){
	var model = Backbone.Model.extend({
		urlRoot: 'https://api.gosquared.com/latest/referrers/'
	});
	return model;
});