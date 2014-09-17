/*!
* \File: ManageProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: ManageProcess
* \Package: com.sirius.sequenziatore.client.presenter.user
* \Brief: Gestione di un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'presenter/user/SendData',
 'text!view/user/manageProcessTemplate.html',
 'model/user/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendData, manageProcessTemplate, ProcessModel ) {

	// PRIVATE

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#process .alertPanel h3").text( title );
		$("#process .alertPanel p").text( content );
		$("#process .alertPanel").popup("open");
	};

	// ritorna il paramentro get con nome "param" se presente nella url, altrimenti ritorna false
	var getParam = function( param ) {
		var hash = window.location.hash;
		var expression = new RegExp("#process\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
		var result = expression.exec(hash);
		return result ? ( Number(result[3]) || result[5]  ) : false;
	};

	// gestisce l'iscrizione al processo gestito
	var subscribe = function( event ) {
		console.log("unsubscribe");
		$.mobile.loading('show');
		var self = this;
		this.process.subscribe({ username: this.session.getUsername() }).done( function() {
			$.mobile.loading('hide');
			self.update();
		}).fail( function( error ) {
			$.mobile.loading('hide');
			if(error.status == 0) printMessage("Errore", "Errore di connessione.");
			else printMessage("Errore", error.status+" "+error.statusText);
		});
	};

	// gestisce la disiscrizione dal processo gestito
	var unsubscribe = function( event ) {
		console.log("unsubscribe");
		$.mobile.loading('show');
		this.process.unsubscribe({ username: this.session.getUsername() }).done( function() {
			$.mobile.loading('hide');
			printMessage("Azione eseguita", "Disiscrizione avvenuta con successo.");
			$("#process .alertPanel").on( "popupafterclose", function() {
				window.location.assign("#home");
			});
		}).fail( function( error ) {
			$.mobile.loading('hide');
			if(error.status == 0) printMessage("Errore", "Errore di connessione.");
			else printMessage("Errore", error.status+" "+error.statusText);
		});
	};

	// gestisce l'eliminazione del processo gestito dalla lista dei processi dell'utente
	var eliminateProcess = function( event ) {
		$.mobile.loading('show');
		this.process.unsubscribe({ username: this.session.getUsername() }).done( function() {
			$.mobile.loading('hide');
			printMessage("Azione eseguita", "Il processo è stato eliminato.");
			$("#process .alertPanel").on( "popupafterclose", function() {
				window.location.assign("#home");
			});
		}).fail( function( error ) {
			$.mobile.loading('hide');
			if(error.status == 0) printMessage("Errore", "Errore di connessione.");
			else printMessage("Errore", error.status+" "+error.statusText);
		});
	};

	// PUBLIC

	var ManageProcess = BasePresenter.extend({

		session: null,
		process: null,
		sendData: null,

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.session = options.session;
			this.sendData = new SendData({ session: options.session });
			var self = this;
			// rilancia l'evento "updated" della sub-view sendData
			this.listenTo( this.sendData, "updated", function() {
				self.trigger("updated");
			});
		},

		template: _.template(manageProcessTemplate),

		id: '#process',

		el: $('body'),

		// events list
		events: {
			'click #subscribe': subscribe,
			'click #unsubscribe': unsubscribe,
			'click #eliminateProcess': eliminateProcess
		},

		render: function( options, error ) {
			options["username"] = this.session.getUsername();
			options["error"] = typeof error !== "undefined" ? error : null;
			// template rendering and JQM css enhance
			$(this.id).html(this.template( options )).enhanceWithin();
		},

		// aggiorna i dati della pagina recuperandoli dal server
		update: function() {
			if(processId = getParam("id")) {
				// creazione del processo con id "processId", se non ancora presente
				if(!this.process || this.process.id != processId ) {
					this.process = new ProcessModel({ id: processId }, {
						username: this.session.getUsername()
					});
				}
				
				var self = this;
				// recupero dal server dei dati del processo "process"
				this.process.fetch().done( function( data ) {
					console.log(data);
					var options = {
						process: self.process.toJSON(),
						subscribed: data.subscribed,
						steps: self.process.steps.toJSON()
					};
					// (a): gestione dell'esecuzione del passo con id "stepId"
					if( stepId = getParam("step") ) {
						self.sendData.update( { stepId: stepId }, options );
					}
					// (b): gestione del processo "process"
					else {	
						self.render( options );
						self.trigger("updated");
					}
				}).fail( function( error ) {
					// gestione errori
					if(error.status == 0) self.render({}, { text: "Errore di connessione", status: 0 });
					else self.render({}, { text: "Processo inesistente o eliminato", status: error.status });
					self.trigger("updated");
				});
			}
			else {
				this.render({}, { text: "Processo inesistente o eliminato", status: 400 });
				this.trigger("updated");
			}
		}

	});

	return ManageProcess;

});
