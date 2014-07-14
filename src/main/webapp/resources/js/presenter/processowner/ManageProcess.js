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
 'model/ProcessModel',
 'collection/processDataCollection'
 'text!view/processowner/manageProcessTemplate.html',
 'text!view/processowner/processDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, Process, ProcessData, manageProcessTemplate, processDataTemplate ){

	var ManageProcess = BasePresenter.extend({

		process: null,

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			
			this.update();
		},

		id: '#process',

		el: $('body'),

		events: {
			'click .tabButton': 'changeTab',
			'click #terminateProcess': 'terminateProcess',
			'click #eliminateProcess': 'eliminateProcess'
		},

		render: function( template ) {
			options = { process: this.process.toJSON() };
			var steps = new Array();
			if(stepId = this.getParam("stepId")) {
				steps.push(this.process.steps.get(stepId).toJSON());
				options["processData"] = this.processData.toJSON();
			}
			else if(username = this.getParam("username")) {
				var self = this;
				_.each(this.processData, function(data) { 
					var step = self.process.steps.get(data.stepId).toJSON();
					step["processData"] = data.toJSON();
					steps.push(step);
				}
			}
			else {
				steps = this.process.steps.toJSON();
				options["users"] = this.process.users.toJSON();
			}
			$(this.id).html(template( options )).enhanceWithin();
		},

		update: function() {
			if(processId = this.getParam("id")) {
				if(!this.process || this.process.id != processId ) {
					this.process = new Process({ id: processId });
				}
				var self = this;
				$.when(
					this.process.fetch(),
					this.process.steps.fetch()
				).done( function() {
					if(stepId = this.getParam("step")) {
						self.processData.fetch({ stepId: stepId }).done( function() {
							self.render( _.template( processDataTemplate ) );
						});
					}
					else if(username = this.getParam("username")) {
						self.processData.fetch({
							processId: processId, 
							username: username 
						}).done( function() {
							self.render( _.template( processDataTemplate ) );
						});
					}
					else self.render( _.template( manageProcessTemplate ) );
				});
			}
			else {
			
			}
		},

		getParam: function(param) {
			var hash = window.location.hash;
			var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})|"+param+"=(\\w{1,20})");
			var result = expression.exec(hash);
			return result ? ( result[3] || Number(result[2]) ) : false;
		},
		
		changeTab: function(event) {
			event.preventDefault();
			var target =  $(event.target).attr("href");
			$(".tab, .mainTab").hide();
			$(target).show();
		},
		
		eliminateProcess: function() {
			this.process.eliminate().done(function() {
				$("#alert h3").text("Azione eseguita");
				$("#alert p").text("Il processo è stato eliminato.");
				$("#alert").on( "popupafterclose", function() {
					window.location.assign("#processes");
				});
			}).fail(function() {
				$("#alert h3").text("Errore");
				$("#alert p").text("Errore di connessione.");
			}).always(function() {
				$("#alert").popup("open");
			});
		},
		
		terminateProcess: function(event) {
			var self = this;
			this.process.terminate().done(function() {
				var activeTab = $(".tab:visible").attr("id");
				self.render({});
				$("#alert h3").text("Azione eseguita");
				$("#alert p").text("Il processo è stato terminato.");
				$("a[href=#"+activeTab+"]").click();
			}).fail(function() {
				$("#alert h3").text("Errore");
				$("#alert p").text("Errore di connessione.");
			}).always(function() {
				$("#alert").popup("open");
			});
		}

	});

	return ManageProcess;

});
