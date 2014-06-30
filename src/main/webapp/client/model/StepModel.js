define([
 'backbone',
], function( Backbone ){

	var Step = Backbone.Model.extend({

		url: function() {
			return "client/data/step"+this.id+".json";
			//"localhost:8080/sequenziatore/step/{"+this.id+"}"
		}

	});

	return Step;

});
