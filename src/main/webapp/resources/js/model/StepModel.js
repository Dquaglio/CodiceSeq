/*!
* \File: StepModel.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: StepModel
* \Package: com.sirius.sequenziatore.client.model
* \Brief: Gestione dei dati di un passo di un processo
*/
define([
 'backbone'
], function( Backbone ){

	var StepModel = Backbone.Model.extend({

		url: function() {
			return "resources/js/data/step"+this.id+".json";
			//return "http://localhost:8080/sequenziatore/step"+this.id;
		}

	});

	return StepModel;

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