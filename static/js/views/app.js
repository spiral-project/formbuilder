define(['backbone', 'vent', 'views/FormBuilder'],
  function(Backbone, vent, FormBuilder){
  'use strict';

	var App = Backbone.View.extend({
		initialize: function(){
			new FormBuilder();
			//new Router();
			Backbone.history.start();
		}
	});

	return App;
});
