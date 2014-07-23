/*!
* \File: ProcessDataCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessDataCollection
* \Package: com.sirius.sequenziatore.client.model.collection.processowner
* \Brief: Gestione della collezione di dati ricevuti dagli utenti riguardanti un processo
*/
define([
 'backbone',
 'jquery',
 'underscore',
 'model/processowner/ProcessDataModel'
], function( Backbone, $, _, ProcessDataModel ){

	var ProcessDataCollection = Backbone.Collection.extend({

		model: ProcessDataModel,

		//  Backbone.Collection.fetch overriding
		fetch: function( options ) {
			// (a): recupera i dati inviati dagli utenti relativi ad un passo
			if(options.stepId) {
				this.url = "resources/js/data/stepdata"+options.stepId+"processowner.json";
				// this.url = "http://localhost:8080/sequenziatore/stepdata/"+options.stepId+"/processowner";
			}
			// (b): recupera i dati inviati da un utente relativi ad un processo
			else if(options.processId && options.username) {
				this.url = "resources/js/data/report"+options.username+options.processId+".json";
				// this.url = "http://localhost:8080/report/"+options.username+"/"+options.processId;
			}
			return this.constructor.__super__.fetch.apply(this);
		},

		//  Backbone.Collection.parse overriding
		parse: function(response) {	
			// Cambia gli indici dell'array "values", ordinandoli per id del dato del passo corrispondente
			_.each(response, function( data ) {
				data.values = _.indexBy(data.values, 'dataId');
				if(data.values.hasOwnProperty("undefined")) {
					data.values["coordinates"] = data.values["undefined"];
					delete data.values["undefined"];
				}
			});
			return response;
		}

		// this.url = "resources/js/data/approvedata.json";
		// this.url = "http://localhost:8080/sequenziatore/approvedata";

	});
	
	return ProcessDataCollection;

});
