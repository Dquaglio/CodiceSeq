/*!
* \File: MainProcessOwner.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-10
* \Class: MainProcessOwner
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della pagina principale dell'utente Process owner
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/mainProcessOwnerTemplate.html',
 'model/processowner/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, mainProcessOwnerTemplate, Process ){

	var MainProcessOwner = BasePresenter.extend({

		// constructor
		initialize: function() {
			this.constructor.__super__.createPage.call(this, "home");
			_.extend(this.events, BasePresenter.prototype.events);
			this.render();
		},

		template: _.template(mainProcessOwnerTemplate),
		
		id: '#home',

		el: $('body'),
		
		events: {
			'submit #myForm': 'sendData'
		},

		sendData: function( event ) {
			event.preventDefault();
			var file = $("#image")[0].files[0];
			var formData = new FormData();
			formData.append("image", file);
			
			var process = new Process();
			process.set({
				id: 1,
				name: "Processo prova",
				description: "descrizione prova",
				terminated: false,
				eliminated: false,
				imageUrl: null,
			});
			var blocks = [];
			blocks.push({
				type: "unordered",
				requiredSteps: 1,
				nextBlock: null,
				steps: null
			});
			process.save([], { blocks: blocks }).done( function(data) {
				$.ajax({
					 url: "http://localhost:8080/sequenziatore/process/"+data+"/saveimage",
					 data: formData,
					 cache: false,
					 contentType: false,
					 processData: false,
					 type: 'POST',
				}).done( function( data ) {
					console.log("dati inviati");
					console.log(data);
				}).fail( function(a, error) {
					console.log("errore: dati non inviati");
					console.log(error);
				});
			});
		},

		render: function( waitingDataNumber ) {
			// 0 as default value
			waitingDataNumber = typeof waitingDataNumber !== "undefined" ? waitingDataNumber : 0;

			$(this.id).html(this.template({
				username: sessionStorage.getItem("username"),
				waitingDataNumber: waitingDataNumber
			})).enhanceWithin();
		},

		notifyWaitingData: function( waitingDataNumber ) {
			this.render(waitingDataNumber);
		}

	});

	return MainProcessOwner;

});
