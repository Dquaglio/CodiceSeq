/*!
* \File: ManageProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: ManageProcess
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione di un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'presenter/processowner/ProcessData',
 'model/processowner/ProcessModel',
 'text!view/processowner/manageProcessTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, ProcessDataLogic, Process, manageProcessTemplate ){

	// PRIVATE

	// ritorna il paramentro get con nome "param" se presente nella url, altrimenti ritorna false
	var getParam = function( param ) {
		var hash = window.location.hash;
		var expression = new RegExp("#process\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
		var result = expression.exec(hash);
		return result ? ( Number(result[3]) || result[5]  ) : false;
	};
	
	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#process .alertPanel h3").text( title );
		$("#process .alertPanel p").text( content );
		$("#process .alertPanel").popup("open");
	};

	// getione dell'evento di cambio tab
	changeTab = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		var target =  $(event.target).attr("href");
		$(".tab, .mainTab").hide();
		$(target).show();
		$(".tabButton.ui-btn-active").removeClass("ui-btn-active");
		$(event.target).addClass("ui-btn-active");
	};

	// gestione della navigazione tra pagine tramite link contenuti all'interno di un tab
	activateLink = function( event ) {
		event.preventDefault();
		var target =  $(event.currentTarget).attr("href");
		window.location.assign(target);
	};

	// PUBLIC
	var ManageProcess = BasePresenter.extend({

		session: null,
		process: null,
		processDataLogic: null,

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.processDataLogic = new ProcessDataLogic({ session: options.session });
			var self = this;
			// rilancia l'evento "updated" della sub-view "processDataLogic"
			this.listenTo( this.processDataLogic, "updated", function() {
				self.trigger("updated");
			});
			this.session = options.session;
		},

		template: _.template(manageProcessTemplate),

		id: '#process',

		el: $('body'),

		// events list
		events: {
			'click .tabButton': changeTab,
			'click a.link': activateLink,
			'click #terminateProcess': 'terminateProcess',
			'click #eliminateProcess': 'eliminateProcess'
		},

		render: function( options, error ) {
			options["username"] = this.session.getUsername();
			options["error"] = typeof error !== "undefined" ? error : null;
			// template rendering and JQM css enhance
			$(this.id).html(this.template( options )).enhanceWithin();
			
			// imposta la tab/scheda corrente
			if( typeof this.currentTab != "undefined" && this.currentTab != $(".mainTab").attr("id") )
				$(".tabButton[href=#"+this.currentTab+"]").click();
			else this.currentTab = $(".mainTab").attr("id");
		},

		// aggiorna i dati della pagina recuperandoli dal server
		update: function() {
			if(processId = getParam("id")) {
				// creazione del processo con id "processId", se non ancora presente
				if(!this.process || this.process.id != processId ) {
					this.process = new Process({ id: processId });
				}
				
				var self = this;
				// recupero dal server dei dati del processo "process"
				return $.when(
					this.process.fetch(),
					this.process.steps.fetch()
				).done( function() {
				
					options = {
						process: self.process.toJSON(),
						steps: self.process.steps.toJSON()
					};
					// (a): gestione dei dati ricevuti relativi al passo con id "stepId"
					if(stepId = getParam("step")) {
						self.currentTab = "stepsTab";
						self.processDataLogic.update( { stepId: stepId }, options );
					}
					// (b): gestione dei dati ricevuti dall'utente "username", relativi al processo "process"
					else if(username = getParam("username")) {
						self.currentTab = "usersTab";
						self.processDataLogic.update(
							{ processId: processId, username: username }, options
						);
					}
					// (c): gestione del processo "process"
					else {	
						options["users"] = self.process.users;
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
		},
		
		// gestione della richiesta di eliminazione di un processo terminato dalla lista dei processi gestibili dal process owner
		eliminateProcess: function() {
			var self = this;
			$.mobile.loading('show');
			this.process.eliminate().done( function() {
				$.mobile.loading('hide');
				printMessage("Azione eseguita", "Il processo è stato eliminato.");
				$("#process .alertPanel").on( "popupafterclose", function() {
					window.location.assign("#processes");
				});
			}).fail( function( error ) {
				$.mobile.loading('hide');
				if(error.status == 0) printMessage("Errore", "Errore di connessione.");
				else printMessage("Errore", error.status+" "+error.statusText);
			});
		},

		// gestione della richiesta di terminazione di un processo
		terminateProcess: function(event) {
			var self = this;
			this.currentTab = $(".tab:visible").attr("id");
			$.mobile.loading('show');
			this.process.terminate().done( function() {
				$.mobile.loading('hide');
				self.update().done( function() {
					printMessage("Azione eseguita", "Il processo è stato terminato.");
				});
			}).fail( function( error ) {
				$.mobile.loading('hide');
				if(error.status == 0) printMessage("Errore", "Errore di connessione.");
				else printMessage("Errore", error.status+" "+error.statusText);
			});
		}

	});

	return ManageProcess;

});
