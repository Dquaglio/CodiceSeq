define([
 'backbone',
 'model/StepModel'
], function( Backbone, Step ){

	var Steps = Backbone.Collection.extend({
		
		initialize: function( options ) {
			this.processId = options.processId;
		},
		
		url: function() {
			return  "resources/js/data/allstep"+this.processId+".json"
		},
		//"http://localhost:8080/sequenziatore/allstep/"+this.processId;

		model: Step

	});

	return Steps;

});