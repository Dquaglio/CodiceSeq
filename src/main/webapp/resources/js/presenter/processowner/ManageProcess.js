/*!
* \File: ManageProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-14
* \Class: ManageProcess
* \Package: com.sirius.sequenziatore.client.presenter
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

	var ManageProcess = BasePresenter.extend({

		process: null,
		
		processDataLogic: new ProcessDataLogic(),

		// constructor
		initialize: function() {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.update();
		},

		template: _.template(manageProcessTemplate),

		id: '#process',

		el: $('body'),

		// events list
		events: {
			'click .tabButton': 'changeTab',
			'click #terminateProcess': 'terminateProcess',
			'click #eliminateProcess': 'eliminateProcess',
			'click a.link': 'activateLink'
		},

		render: function( options ) {
			// template rendering and JQM css enhance
			$(this.id).html(this.template( options )).enhanceWithin();
			
			// imposta la tab/scheda corrente
			if( typeof this.currentTab != "undefined" && this.currentTab != $(".mainTab").attr("id") ) {
				//$(".tabButton[href=#"+this.currentTab+"]").addClass("ui-btn-active");
				$(".tabButton[href=#"+this.currentTab+"]").click();
			};
			this.currentTab = $(".mainTab").attr("id");
		},

		// aggiorna i dati della pagina recuperandoli dal server
		update: function() {
			if(processId = this.getParam("id")) {
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
					if(stepId = self.getParam("step")) {
						self.currentTab = "stepsTab";
						self.processDataLogic.update( { stepId: stepId }, options );
					}
					// (b): gestione dei dati ricevuti dall'utente "username", relativi al processo "process"
					else if(username = self.getParam("username")) {
						self.currentTab = "usersTab";
						self.processDataLogic.update(
							{ processId: processId, username: username }, options
						);
					}
					// (c): gestione del processo "process"
					else {	
						options["users"] = self.process.users;
						self.render( options );
					}
					
				}).fail( function( error ) {
					// gestione errori
					if(error.status == 0) self.printMessage("Errore", "Errore di connessione.");
					else self.render({ error: "Processo inesistente o eliminato" });
					
				});
			}
			else this.render({ error: "Processo inesistente o eliminato" });

		},

		// ritorna il paramentro get con nome "param" se presente nella url, altrimenti ritorna false
		getParam: function( param ) {
			var hash = window.location.hash;
			var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})|"+param+"=(\\w{1,20})");
			var result = expression.exec(hash);
			return result ? ( result[3] || Number(result[2]) ) : false;
		},

		// getione dell'evento di cambio tab
		changeTab: function( event ) {
			event.preventDefault();
			event.stopPropagation();
			var target =  $(event.target).attr("href");
			$(".tab, .mainTab").hide();
			$(target).show();
			$(".tabButton.ui-btn-active").removeClass("ui-btn-active");
			$(event.target).addClass("ui-btn-active");
		},

		// gestione della richiesta di eliminazione di un processo terminato dalla lista dei processi gestibili dal process owner
		eliminateProcess: function() {
			var self = this;
			this.process.eliminate().done( function() {
				self.printMessage("Azione eseguita", "Il processo è stato eliminato.");
				$("#alert").on( "popupafterclose", function() {
					window.location.assign("#processes");
				});
			}).fail( function( error ) {
				if(error.status == 0) self.printMessage("Errore", "Errore di connessione.");
				// begin test	
				else if(error.status == 404) self.printMessage("Test error", error.status+" "+error.statusText);
				// end test
				else self.update();
			});
		},

		// gestione della richiesta di terminazione di un processo
		terminateProcess: function(event) {
			var self = this;
			this.currentTab = $(".tab:visible").attr("id");
			this.process.terminate().done( function() {
				self.update().done( function() {
					self.printMessage("Azione eseguita", "Il processo è stato terminato.");
				});
			}).fail( function( error ) {
				if(error.status == 0) self.printMessage("Errore", "Errore di connessione.");
				// begin test	
				else if(error.status == 404) self.printMessage("Test error", error.status+" "+error.statusText);
				// end test
				else self.update();
			});
		},

		// apre un popup con titolo "title" e contenuto "content"
		printMessage: function( title, content ) {
			$("#alert h3").text( title );
			$("#alert p").text( content );
			$("#alert").popup("open");
		},

		// gestione della navigazione tra pagine tramite link contenuti all'interno di un tab
		activateLink: function( event ) {
			event.preventDefault();
			var target =  $(event.currentTarget).attr("href");
			window.location.assign(target);
		},

	});

	return ManageProcess;

});
