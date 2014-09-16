/*!
* \File: ProcessData.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: ProcessData
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della visualizzazione dei dati inviati dagli utenti riguardanti un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'model/processowner/collection/ProcessDataCollection',
 'text!view/processowner/processDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, ProcessDataCollection, processDataTemplate ){

	// PRIVATE

	// aggiorna la pagina con i dati inviati dagli utenti riguardanti il passo "stepId"
	updateStepData = function( stepId, options ) {
		var self = this;
		this.collection.fetch({ stepId: stepId }).done( function() {
			options["step"] = _.findWhere( options.steps, { id: stepId } );
			options["processData"] = self.collection.toJSON();
			self.render( options );	
		}).fail( function( error ) {
			// gestione errori
			if(error.status == 0) self.render( options, { text: "Errore di connessione", status: 0 });
			else self.render( options, { text:"Passo inesistente", status: error.status });
		}).always( function() { self.trigger("updated"); });
	};

	// aggiorna la pagina con i dati inviati dall'utente "usernamee" riguardanti il processo "processId"
	updateUserData = function( processId, username, options ) {
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
			if(error.status == 0) self.render( options, { text: "Errore di connessione", status: 0 });
			else self.render( options, {
				text: "L'utente "+username+" non è più iscritto al processo selezionato",
				status: error.status
			});
		}).always( function() { self.trigger("updated"); });
	};

	// PUBLIC
	var ProcessData = Backbone.View.extend({

		session: null,

		// Constructor
		initialize: function( options ) {
			this.session = options.session;
		},

		collection: new ProcessDataCollection(),

		template: _.template(processDataTemplate),

		id: '#process',

		el: $('body'),

		// template rendering and JQM css enhance
		render: function( options, error ) {
			console.log(options);
			options["username"] = this.session.getUsername();
			options["error"] = typeof error !== "undefined" ? error : null;
			$(this.id).html(this.template( options )).enhanceWithin();
		},

		// aggiorna i dati della collezione "collection" recuperandoli dal server
		update: function( param, options ) {
			if(param.stepId) {
				if( _.findWhere(options.steps, {id: param.stepId}) ) {
					updateStepData.call( this, param.stepId , options );
				}
				else {
					this.render( options, { text:"Passo inesistente", status: 400 });
					this.trigger("updated");
				}
			}
			else updateUserData.call( this, param.processId, param.username, options );
		}

	});

	return ProcessData;

});
