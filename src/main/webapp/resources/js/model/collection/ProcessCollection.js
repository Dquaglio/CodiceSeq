define([
'backbone',
'model/ProcessModel'
], function( Backbone, Process ){

	var Processes = Backbone.Collection.extend({

		model: Process,
		
		url: "resources/js/data/processprocessowner.json",
		// url: "http://localhost:8080/sequenziatore/process/processowner",

	});

	return Processes;

});