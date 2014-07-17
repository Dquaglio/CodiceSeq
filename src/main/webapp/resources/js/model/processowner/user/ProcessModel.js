define([
 'backbone',
 'jquery',
 'collection/StepCollection'
], function( Backbone, $, StepCollection ){

	var Process = Backbone.Model.extend({

		steps: null,

		initialize: function( attributes, options ) {
			this.steps = new StepCollection([], {
				processId: this.id,
				username: options.username
			});
		},

		url: function() {
			return "resources/js/data/process"+this.id+".json";
			//return "http://localhost:8080/sequenziatore/process/"+this.id;
		},
		
		fetch: function() {
			return $.when(
				this.steps.fetch(),
				this.constructor.__super__.fetch.apply(this)
			);
		},

		subscribe: function( username ) {
			var url = "http://localhost:8080/sequenziatore/user/"+username+"/subscribe/"+this.id;
			$.post( url, true);
		},

		unsubscribe: function() {
			var url = "http://localhost:8080/sequenziatore/user/"+username+"/subscribe/"+this.id;
			$.post( url, false);
		}

	});

	return Process;

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