/*!
* \File: ProcessModel.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessModel
* \Package: com.sirius.sequenziatore.client.model
* \Brief: Gestione di un processo
*/
define([
 'jquery',
 'backbone',
 'model/user/collection/StepCollection'
], function( $, Backbone, StepCollection ) {

	var ProcessModel = Backbone.Model.extend({

		steps: null,

		initialize: function( attributes, options ) {
			this.url = "resources/js/data/process"+this.id+".json";
			//this.url = "http://localhost:8080/sequenziatore/process/"+this.id;
			this.steps = new StepCollection([], {
				processId: this.id,
				username: options.username
			});
		},

		fetch: function() {
			var self = this;
			var deferred = $.Deferred();
			if( this.steps ) this.steps.reset();
			this.clear();
			this.constructor.__super__.fetch.apply(this).done( function() {
				self.steps.fetch().done( function() {
					if( self.steps.length ) deferred.resolve({ subscribed: true });
					else deferred.resolve({ subscribed: false });
				}).fail( function(error) {
					deferred.reject(error);
				});
			}).fail( function( error ) { deferred.reject(error); });
			return deferred.promise();
		},

		subscribe: function( options ) {
			var url = "http://localhost:8080/sequenziatore/user/"+options.username+"/subscribe/"+this.id;
			var data = { subscribe: true };
			return $.ajax({
				type: "POST",
				url: url,
				data: $.param( data ),
				cache: false
			});
		},

		unsubscribe: function( options ) {
			var url = "http://localhost:8080/sequenziatore/user/"+options.username+"/subscribe/"+this.id;
			var data = { subscribe: false };
			return $.ajax({
				type: "POST",
				url: url,
				data: $.param( data ),
				cache: false
			});
		}

	});

	return ProcessModel;

});
/* Cosente di recuperare dal server le informazioni su un processo, iscriversi e disiscriversi.
 * Inoltre l'oggetto this.steps contiene la collezione dei passi del processo.
 * 
 * ESEMPIO UTLIZZO
 * model = new ProcessModel({ id: 1 }, { username: "Gabriele" });
 * // stampa modello in JSON su console
 * model.fetch().done( function() {
 *		console.log(model.toJSON());
 *	});
 */
