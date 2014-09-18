/*!
* \File: ProcessDataCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-08-29
* \Class: ProcessDataCollection
* \Package: com.sirius.sequenziatore.client.model.collection.processowner
* \Brief: Gestione della collezione di dati ricevuti dagli utenti riguardanti un processo
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'model/processowner/ProcessDataModel'
], function( $, _, Backbone, ProcessDataModel ){

	var ProcessDataCollection = Backbone.Collection.extend({

		model: ProcessDataModel,

		// Backbone.Collection.fetch overriding
		fetch: function( options ) {
			options = typeof options !== "undefined" ? options : {};
			// (a): recupera i dati inviati dagli utenti relativi ad un passo
			if(options.stepId) {
				//this.url = "resources/js/data/stepdata"+options.stepId+"processowner.json";
				this.url = "http://localhost:8080/sequenziatore/stepdata/"+options.stepId+"/processowner";
			}
			// (b): recupera i dati inviati da un utente relativi ad un processo
			else if(options.processId && options.username) {
				//this.url = "resources/js/data/report"+options.username+options.processId+".json";
				this.url = "http://localhost:8080/sequenziatore/process/"+options.processId+"/"+options.username;
			}
			return this.constructor.__super__.fetch.apply(this);
		},

		// salva nella collezione i dati in attesa di approvazione
		fetchWaiting: function( options ) {
			options = typeof options !== "undefined" ? options : {};
			//this.url = "resources/js/data/approvedata.json";
			this.url = "http://localhost:8080/sequenziatore/approvedata";
			var self = this;
			var deferred = $.Deferred();
			this.constructor.__super__.fetch.apply(this).then( function() {
				if( options.username && options.stepId ) {
					var data = self.findWhere({ username: options.username, stepId: options.stepId });
					if(!data) deferred.reject({ status: 400 });
					else deferred.resolve( data );
				}
				deferred.resolve( null );
			}, function(error) { 
				deferred.reject(error); 
			});
			return deferred.promise();
		},

		//  Backbone.Collection.parse overriding
		parse: function(response) {	
			// Cambia gli indici dell'array "values", ordinandoli per id del dato del passo corrispondente
			_.each(response, function( data ) {
				data.values = _.indexBy(data.values, 'dataId');
			});
			return response;
		}

	});

	return ProcessDataCollection;

});
