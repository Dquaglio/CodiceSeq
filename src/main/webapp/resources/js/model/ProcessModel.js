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
 'collection/StepCollection'
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
			return $.when(
				this.steps.fetch(),
				this.constructor.__super__.fetch.apply(this)
			);
		},

		subscribe: function( username ) {
			var url = "http://localhost:8080/sequenziatore/user/"+username+"/subscribe/"+this.id;
			var data = { subscription: true };
			return $.ajax({
				type: "POST",
				url: url,
				data: $.param( data )
			});
		},

		unsubscribe: function() {
			var url = "http://localhost:8080/sequenziatore/user/"+username+"/subscribe/"+this.id;
			var data = { subscription: false };
			return $.ajax({
				type: "POST",
				url: url,
				data: $.param( data )
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