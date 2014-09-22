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
 'underscore',
 'backbone',
 'model/processowner/StepModel'
], function( $, _, Backbone, StepModel ){

	var StepCollection = Backbone.Collection.extend({

		model: StepModel,

		// constructor
		initialize: function( models, options ) {
			if( typeof options !== "undefined" && options.processId )
				//this.url = "resources/js/data/allstep"+options.processId+".json";
				this.url = "http://localhost:8080/sequenziatore/stepdata/allstep/"+options.processId;
		},

		//  Backbone.Collection.parse overriding
		parse: function(response) {
			var steps = response.reverse();
			return steps;
		}
	});

	return StepCollection;

});