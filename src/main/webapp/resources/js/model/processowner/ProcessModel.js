/*!
* \File: ProcessModel.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessModel
* \Package: com.sirius.sequenziatore.client.model.processowner
* \Brief: Gestione dei dati di un processo
*/
define([
 'backbone',
 'jquery',
 'collection/processowner/StepCollection'
], function( Backbone, $, StepCollection ){

	var ProcessModel = Backbone.Model.extend({

		steps: null,

		// constructor
		initialize: function() {
			// inizializzazione della collezione dei passi del processo
			this.steps = new StepCollection([], { processId: this.id });
		},

		//  Backbone.Model.save overriding
		save: function(attributes, options) {
			return $.ajax({
				type: "POST",
				url: "http://localhost:8080/sequenziatore/process/processowner",
				data: JSON.stringify( this.toJSON() ),
				cache: true,
				dataType: "json",
				contentType: "application/json;charset=utf-8",
				success: function( data ) {
					self.saveImage( options.image, data );
				}
			});
		},

		// salvataggio dell'immagine di un processo
		// image deve essere un oggetto di tipo "FormData"
		saveImage: function( image, processId ) {
			$.ajax({
				type: 'POST',
				url: "http://localhost:8080/sequenziatore/process/"+processId+"/saveimage",
				data: image,
				cache: false,
				contentType: false,
				processData: false
			});
		},

		//  Backbone.Model.fetch overriding
		fetch: function() {
			this.url = "resources/js/data/process"+this.id+".json";
			//this.url = "http://localhost:8080/sequenziatore/process/"+this.id;
			return $.when(
				// esegue il fetch dei dati del processo
				this.constructor.__super__.fetch.apply(this),
				this.getUsernameList()
			);
		},

		// Aggiunge al processo la lista degli utenti iscritti ad esso
		getUsernameList: function() {
			var self = this;
			//var url = "http://localhost:8080/sequenziatore/userlist/"+this.id;
			var url = "resources/js/data/userlist"+this.id+".json";
			return $.get( url, function(data) {
				self.users = data;
			});
		},

		// Termina il processo
		terminate: function() {
			var url = "http://localhost:8080/sequenziatore/terminateprocess/"+this.id+"/processowner";
			return $.post( url, function() {
				this.set("terminated", true);
			}).fail(function(){});
		},

		// Elimina il processo dalla lista dei processi gestibili dall'utente process owner
		eliminate: function() {
			var url = "http://localhost:8080/sequenziatore/deleteprocess/"+this.id+"/processowner";
			return $.post( url, function() {
				this.set("eliminated", true);
			});
		}

	});

	return ProcessModel;

});

/* ========================================
			ESEMPIO SALVATAGGIO PROCESSO
	========================================
	file = $("#image")[0].files[0];
	var formData = new FormData();
	formData.append("image", file); 
	process.save(null, { image: formData });
*/
