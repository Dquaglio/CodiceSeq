define([
 'backbone',
], function( Backbone ){

	var Step = Backbone.Model.extend({

		url: function() {
			return "resources/js/data/step"+this.id+".json";
		}

	});

	return Step;

});
