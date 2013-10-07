define(['backbone', 'vent', 'views/FormBuilder', 'views/FormList', 'views/Elements', 'views/Stats', 'views/Blog'], function(Backbone, vent, FormBuilder, FormList, Elements, Stats, Blog){

	var App = Backbone.View.extend({
		initialize: function(){
			new FormBuilder();
			new FormList();
			new Elements();
			new Stats();
			new Blog();

			new Router();
			Backbone.history.start();
		}
	});

	window.Router = Backbone.Router.extend({
	    routes: {
	        'post/:post' : 'showPost'
	    },
	    showPost: function(post){
	        vent.trigger('show:post', post);
	    }
	});

	return App;

});