define(['backbone', 'vent', 'tipsy'], function(Backbone, vent, tipsy){

	/*-----------------------------------
	| Module
	------------------------------------*/

	var Module = Backbone.View.extend({
		initialize: function(){
			new tipped();
		}
	});

	/*-----------------------------------
	| Tipsy
	------------------------------------*/

	var tipped = Backbone.View.extend({
		el: '.tipped',
		initialize: function(){
			this.$el.tipsy({gravity: 'n'});
		}
	});

	return Module;

});