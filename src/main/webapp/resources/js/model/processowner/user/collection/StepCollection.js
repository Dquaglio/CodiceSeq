define([
 'backbone',
 'model/StepModel'
], function( Backbone, Step ){

	var Steps = Backbone.Collection.extend({
		
		initialize: function( models, options ) {
			//this.url = "http://localhost:8080/sequenziatore/user/"+options.username+"\subscribe\"+options.processid;
			this.url = "resources/js/data/user"+options.username+"subscribe"+options.processId+".json";
		},
		
		model: Step,
		
		fetch: function() {
			var deferred = $.Deferred();
			var self = this;
			$.get( url, function( data ) {
				for(i=0; i<data.length; i++) {
					var step = new Step({ id: data[i].stepId, state: data[i].state });
					self.push(step);
				}
				$.when.apply(null, self.fetchSteps()).done( function() {
					deferred.resolve();
				});
			}, "json");
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

	return Steps;

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