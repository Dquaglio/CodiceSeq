define([
 'backbone',
 'jquery',
 'model/ProcessDataModel',
 'collection/StepCollection',
 'model/StepModel'
], function( Backbone, $, ProcessData, Steps, Step ){

	var ProcessDataCollection = Backbone.Collection.extend({

		initialize: function( models, options ) {
			this.url = "resources/js/data/report"+options.username+options.processId+".json";
			// this.url = "http://localhost:8080/report/"+options.username+"/"+options.processId;
		},

		model: ProcessData

	});
	
	return ProcessDataCollection;

});
/* Cosente di recuperare dal server i dati inviati dall'utente "username"
 * riguardanti il processo "processId".
 * Consente dunque di stampare il report.
 * 
 * ESEMPIO UTLIZZO
 * collection = new ProcessDataCollection([], { username: "Gabriele", processId: 1 });
 * // stampa collezione in JSON su console
 * collection.fetch().done( function() {
 *		collection.log(collection.toJSON())
 *	});
 */
