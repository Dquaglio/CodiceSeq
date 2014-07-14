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
/* Cosente di recuperare dal server le informazioni sulla struttura di un passo.
 * Classe utlizzata dalla classe "StepCollection".
 * 
 * ESEMPIO UTLIZZO
 * model = new StepModel({ id: 1 });
 * // stampa collezione in JSON su console
 * model.fetch().done( function() {
 *		model.log(collection.toJSON())
 *	});
 */