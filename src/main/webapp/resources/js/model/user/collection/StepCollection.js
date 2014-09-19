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
 'model/user/StepModel'
], function( $, Backbone, StepModel, ProcessCollection ){

	var StepCollection = Backbone.Collection.extend({

		initialize: function( models, options ) {
			if( typeof options !== "undefined" && options.processId )
				this.url = "http://localhost:8080/sequenziatore/user/"+options.username+"/subscribe/"+options.processId;
				//this.url = "resources/js/data/user"+options.username+"subscribe"+options.processId+".json";
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
						var step = new StepModel({ id: data[i].currentStepId, state: data[i].state });
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
		},

		// salva nella collezione i dati approvati o respinti
		fetchApproved: function( options ) {
			options = typeof options !== "undefined" ? options : {};
			//var url = "resources/js/data/user"+options.username+"datasent.json";
			var url = "http://localhost:8080/sequenziatore/user/"+options.username+"/datasent";
			var deferred = $.Deferred();
			var self = this;
			$.ajax({	
				type: "GET",
				url: url,
				dataType: "json",
				success: function( data ) {
					for(i=0; i<data.length; i++) {
						if(data[i]) self.push( new StepModel({
							id: data[i].currentStepId,
							state: data[i].state
						}));
					}
					$.when.apply(null, self.fetchSteps()).done( function() {
						deferred.resolve();
					}).fail( function(error) { deferred.resolve(); });
				},
				error: function( error ) { deferred.reject(error); }
			});
			return deferred.promise();
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
