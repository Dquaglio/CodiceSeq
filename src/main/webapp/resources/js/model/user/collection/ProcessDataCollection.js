/*!
* \File: ProcessDataCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessDataCollection
* \Package: com.sirius.sequenziatore.client.model.collection
* \Brief: Gestione della collezione dei dati inviati da un utente riguardanti un processo
*/
define([
 'jquery',
 'backbone',
 'model/ProcessDataModel'
], function( $, Backbone, ProcessDataModel ){

	var ProcessDataCollection = Backbone.Collection.extend({

		initialize: function( models, options ) {
			this.url = "resources/js/data/report"+options.username+options.processId+".json";
			// this.url = "http://localhost:8080/report/"+options.username+"/"+options.processId;
		},

		model: ProcessDataModel

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
