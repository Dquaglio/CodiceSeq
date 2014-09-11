/*!
* \File: CheckStep.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-23
* \Class: CheckStep
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione dei passi che richiedono intervento umano
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'collection/processowner/ProcessDataCollection',
 'collection/processowner/ProcessCollection',
 'collection/processowner/StepCollection',
 'text!view/processowner/checkStepTemplate.html',
 'text!view/processowner/approveDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, ProcessDataCollection, ProcessCollection, StepCollection, checkStepTemplate, approveDataTemplate ){

	// PRIVATE
	var getParam = function(param) {
		var hash = window.location.hash;
		var expression = new RegExp("#checkstep\\?(\\w+=\\w+&)*("+param+"=(\\d{1,11}))|("+param+"=(\\w{1,20}))");
		var result = expression.exec(hash);
		return result ? ( Number(result[3]) || result[5]  ) : false;
	};

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#checkstep .alertPanel h3").text( title );
		$("#checkstep .alertPanel p").text( content );
		$("#checkstep .alertPanel").popup("open");
	};

	// recupera le informazioni sui passi relativi ai dati che richidono intervento umano
	var updateStepData = function() {
		var deferreds = [];
		var self = this;
		this.steps.forEach( function( step ) {
			if( !self.collection.findWhere({ stepId: step.id }) )
				self.steps.remove( step );
		});
		this.collection.each( function( data ) {
			if( !self.steps.get( data.get("stepId") ) ) {
				self.steps.add( new self.steps.model({ id: data.get("stepId") }) );
				deferreds.push( self.steps.get( data.get("stepId") ).fetch() );
			}
		});
		return deferreds;
	};

	// recupera le informazioni sui processi relativi ai dati che richidono intervento umano
	var updateProcessData = function() {
		var deferreds = [];
		var self = this;
		this.processes.forEach( function( process ) {
			if( !self.steps.findWhere({ processId: process.id }) )
				self.processes.remove( process );
		});
		this.steps.pluck("processId").forEach( function( processId ) {
			if( !self.processes.get( processId ) ) {
				self.processes.add( new self.processes.model({ id: processId }) );
				deferreds.push( self.processes.get( processId ).fetch() );
			}
		});
		return deferreds;
	};

	// PUBLIC
	var CheckStep = BasePresenter.extend({

		session: null,
		collection: new ProcessDataCollection(),
		processes: new ProcessCollection(),
		steps: new StepCollection(),

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "checkstep");
			_.extend(this.events, BasePresenter.prototype.events);
			this.session = options.session;
		},

		approveDataTemplate: _.template( approveDataTemplate ),
		checkStepTemplate: _.template( checkStepTemplate ),

		id: '#checkstep',

		el: $('body'),

		events: {
			'click #approve': 'approveData',
			'click #reject': 'rejectData'
		},

		render: function( options, error ) {
			options["error"] = typeof error !== "undefined" ? error : null;
			options["username"] = this.session.getUsername();
			// (a): render della pagina di approvazione dei dati inviati dall'utente "username" relativi al "stepId"
			if( getParam("step") && getParam("username") ) {
				var step = this.steps.get( getParam("step") );
				options["waitingData"] = options.data ? options.data.toJSON() : null;
				options["step"] = step ? step.toJSON() : null;
				options["process"] = step ? this.processes.get( options.step.processId ).toJSON() : null;
				// template rendering and JQM css enhance
				$(this.id).html(this.approveDataTemplate( options )).enhanceWithin();
			}
			// (b): render della pagina di ricerca dei dati che richiedono approvazione
			else {
				options["waitingData"] = this.collection.toJSON();
				options["steps"] = this.steps.toJSON();
				options["processes"] = this.processes.toJSON();
				options["processId"] = getParam("id");
				// template rendering and JQM css enhance
				$(this.id).html(this.checkStepTemplate( options )).enhanceWithin();
			}
		},

		// aggiorna la collezione dei dati che richiedono approvazione
		update: function() {
			var self = this;
			this.collection.fetchWaiting({
				username: getParam("username"),
				stepId: getParam("step")
			}).done( function( data ) {
				$.when.apply(null, updateStepData.apply(self)).then( function() {
					return $.when.apply(null, updateProcessData.apply(self));
				}).done( function() {
					self.render({ data: data });
					self.trigger("updated");
				}).fail( function( error ) {
					// gestione errori
					if(error.status == 0) self.render( {}, { text: "Errore di connessione", status: 0 });
					self.trigger("updated");
				});
			}).fail( function( error ) {
				// gestione errori
				if(error.status == 0) self.render( {}, { text: "Errore di connessione", status: 0 });
				else self.render( {}, { text: "Il passo selezionato non richiede approvazione", status: error.status });
				self.trigger("updated");
			});
		},

		// gestione dell'evento: "waitingDataNumber" passi richiedono approvazione
		notifyWaitingData: function( collection ) {
			changed = false;
			var self = this;
			for( var i=0; i<collection.length && !changed; i++ ) {
				var model = collection.at(i);
				if( !self.collection.findWhere({
					stepId: model.get("stepId"),
					username: model.get("username")
				})) changed = true;
			}
			if(changed) this.update();
		},

		// gestione della richiesta di approvazione dei dati di un passo
		approveData: function() {
			var data = this.collection.findWhere({ stepId: getParam("step"), username: getParam("username") });
			var self = this;
			$.mobile.loading('show');
			data.approve( true ).done( function() {
				$.mobile.loading('hide');
				self.collection.remove( data );
				printMessage("Azione eseguita", "Dati approvati.");
				$("#checkstep .alertPanel").on( "popupafterclose", function() {
					var processId = self.steps.get( data.get("stepId") ).get("processId");
					window.location.assign("#checkstep?id="+processId);
				});
			}).fail( function( error ) {
				$.mobile.loading('hide');
				if(error.status == 0) printMessage("Errore", "Errore di connessione.");
				else printMessage("Errore", error.status+" "+error.statusText);
			});
		},

		// gestione della richiesta di disapprovazione dei dati di un passo
		rejectData: function() {
			var data = this.collection.findWhere({ stepId: getParam("step"), username: getParam("username") });
			var self = this;
			$.mobile.loading('show');
			data.approve( false ).done( function() {
				$.mobile.loading('hide');
				self.collection.remove( data );
				printMessage("Azione eseguita", "Dati respinti.");
				$("#checkstep .alertPanel").on( "popupafterclose", function() {
					var processId = self.steps.get( data.get("stepId") ).get("processId");
					window.location.assign("#checkstep?id="+processId);
				});
			}).fail( function( error ) {
				$.mobile.loading('hide');
				if(error.status == 0) printMessage("Errore", "Errore di connessione.");
				else printMessage("Errore", error.status+" "+error.statusText);
			});
		}

	});

	return CheckStep;

});