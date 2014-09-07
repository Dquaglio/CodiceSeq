/*!
* \File: StepCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: StepCollection
* \Package: com.sirius.sequenziatore.client.model.collection.processowner
* \Brief: Gestione dei dati riguardanti la collezione dei passi di un processo
*/
define([
 'jquery',
 'backbone',
 'model/StepModel'
], function( $, Backbone, StepModel ){

	var StepCollection = Backbone.Collection.extend({

		model: StepModel,

		// constructor
		initialize: function( models, options ) {
			this.url = "resources/js/data/allstep"+this.processId+".json";
			//this.url = "http://localhost:8080/sequenziatore/allstep/"+this.processId;
			options = typeof options !== "undefined" ? options : {};
			if( options.processId ) this.processId = options.processId;
		}

	});

	return StepCollection;

});