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
 'model/StepModel'
], function( $, Backbone, StepModel ){

	var StepCollection = Backbone.Collection.extend({

		initialize: function( models, options ) {
			//this.url = "http://localhost:8080/sequenziatore/user/"+options.username+"/subscribe/"+options.processId;
			this.url = "resources/js/data/user"+options.username+"subscribe"+options.processId+".json";
		},

		model: StepModel,

		fetch: function() {
			var deferred = $.Deferred();
			var self = this;
			$.ajax({	
				type: "GET",
				url: this.url,
				dataType: "json",
				success: function( data ) {
					for(i=0; i<data.length; i++) {
						var step = new StepModel({ id: data[i].stepId, state: data[i].state });
						self.push(step);
					}
					$.when.apply(null, self.fetchSteps()).done( function() {
						deferred.resolve();
					}).fail( function(error) { deferred.reject(error); });
				},
				error: function( error ) { deferred.reject(error); }
			});
			return deferred.promise();
		},

		fetchSteps: function() {
			var deferreds = [];
			for (i = 0; i < this.models.length; i++) {
				deferreds.push( this.models[i].fetch() );
			}
			return deferreds;
		}

	});

	return StepCollection;

});
/* Cosente di recuperare dal server le informazioni sui passi eseguibili 
 * dall'utente "username" del processo "processId".
 * Questa classe non dovrebbe essere usata singolarmente, ma solo come oggetto 
 * della classe "ProcessModel".
 * 
 * ESEMPIO UTLIZZO
 * collection = new StepCollection([], { processId: 1, username: "Gabriele" });
 * // stampa collezione in JSON su console
 * collection.fetch().done( function() {
 *		console.log(collection.toJSON())
 *	});
 */