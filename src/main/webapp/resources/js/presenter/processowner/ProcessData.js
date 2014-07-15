/*!
* \File: ProcessData.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-14
* \Class: ProcessData
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Gestione della visualizzazione dei dati inviati dagli utenti riguardanti un processo creato
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'collection/ProcessDataCollection',
 'text!view/processowner/processDataTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, ProcessData, processDataTemplate ){

	var ProcessData = Backbone.View.extend({

		collection: null,

		template: _.template(processDataTemplate),

		render: function( options ) {
			return this.template({
				process: options.process.toJSON(),
				steps: options.steps.toJSON(),
				processData: collection.toJSON()
			});
		},

		update: function( options ) {
			this.collection = new ProcessData();
			if(options.hasOwnProperty("stepId")) {
				return this.processData.fetch({ stepId: options.stepId });
			}
			else return this.processData.fetch({ 
				processId: options.processId,
				username: options.username
			});
		}

	});

	return ProcessData;

});
