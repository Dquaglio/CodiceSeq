/*!
* \File: ProcessData.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-14
* \Class: ProcessData
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Gestione della visualizzazione dei dati inviati dagli utenti riguardanti un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'collection/processowner/ProcessDataCollection',
 'text!view/processowner/processDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, ProcessDataCollection, processDataTemplate ){

	var ProcessData = Backbone.View.extend({

		collection: new ProcessDataCollection(),

		template: _.template(processDataTemplate),

		id: '#process',

		el: $('body'),

		// template rendering and JQM css enhance
		render: function( options, error ) {
			options["error"] = typeof error !== "undefined" ? error : null;
			$(this.id).html(this.template( options )).enhanceWithin();
		},

		// aggiorna i dati della collezione "collection" recuperandoli dal server
		update: function( param, options ) {
			if(param.stepId) {
				if( _.findWhere(options.steps, {id: param.stepId}) ) {
					this.updateStepData( param.stepId , options );
				}
				else this.render( options, "Passo inesistente" );
			}
			else {
				this.updateUserData( param.processId, param.username, options );
			}
		},

		// aggiorna la pagina con i dati inviati dagli utenti riguardanti il passo "stepId"
		updateStepData: function( stepId, options ) {
			var self = this;
			this.collection.fetch({ stepId: stepId }).done( function() {
				options["step"] = _.findWhere( options.steps, { id: stepId } );
				options["processData"] = self.collection.toJSON();
				self.render( options );	
			}).fail( function( error ) {
				// gestione errori
				if(error.status == 0) self.printMessage("Errore", "Errore di connessione.");
				else self.render( options, "Passo inesistente" );
			});
		},
		
		// aggiorna la pagina con i dati inviati dall'utente "usernamee" riguardanti il processo "processId"
		updateUserData: function( processId, username, options ) {
			var self = this;
			this.collection.fetch({
				processId: processId, 
				username: username 
			}).done( function() {
				var steps = new Array();
				self.collection.each( function(data) {
					var step = _.findWhere( options.steps, { id: data.get("stepId") } );
					step["processData"] = data.toJSON();
					steps.push(step);
				});
				options["user"] = username;
				options["steps"] = steps;
				self.render( options );	
			}).fail( function( error ) {
				// gestione errori
				if(error.status == 0) self.printMessage("Errore", "Errore di connessione.");
				else self.render(
					options, "L'utente "+username+" non è più iscritto al processo selezionato"
				);
			});
		},

		// apre un popup con titolo "title" e contenuto "content"
		printMessage: function( title, content ) {
			$("#alert h3").text( title );
			$("#alert p").text( content );
			$("#alert").popup("open");
		},

	});

	return ProcessData;

});
