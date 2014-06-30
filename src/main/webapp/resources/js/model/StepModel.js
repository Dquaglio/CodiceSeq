define([
 'backbone',
], function( Backbone ){

	var Step = Backbone.Model.extend({

		url: function() {
			return "resources/js/data/step"+this.id+".json";
			//"localhost:8080/sequenziatore/step/{"+this.id+"}"
		}

	});

	return Step;

});