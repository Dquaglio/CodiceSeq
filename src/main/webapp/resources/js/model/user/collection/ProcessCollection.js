define([
 'backbone',
 'model/ProcessModel'
], function( Backbone, Process ){

	var Processes = Backbone.Collection.extend({

		initialize: function( options ) {
			this.url = "resources/js/data/user"+options.username+"processlist.json";
			//this.url = "http://localhost:8080/sequenziatore/user/"+options.username+"/processlist";
		},

		model: Process

	});

	return Processes;

});
/* Cosente di recuperare dal server i processi.
 * Per ora non sono divisi in iscritto/nonIscritto perché stiamo snellendo questa funzione.
 * 
 * ESEMPIO UTLIZZO
 * collection = new ProcessCollection({ username: "Gabriele" });
 * // stampa collezione in JSON su console
 * collection.fetch().done( function() {
 *		console.log(collection.toJSON());
 *	});
 */