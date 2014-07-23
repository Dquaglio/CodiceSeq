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
 'backbone',
 'model/StepModel'
], function( Backbone, Step ){

	var StepCollection = Backbone.Collection.extend({
		
		// constructor
		initialize: function( models, options ) {
			this.processId = options.processId;
		},
		
		url: function() {
			return  "resources/js/data/allstep"+this.processId+".json"
		},
		//"http://localhost:8080/sequenziatore/allstep/"+this.processId;

		model: Step

	});

	return StepCollection;

});