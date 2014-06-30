define([
'backbone',
'model/ProcessModel'
], function( Backbone, Process ){

	var Processes = Backbone.Collection.extend({

		model: Process,
		
		url: function() {
			return "client/data/processesData.json"; //"localhost:8080/sequenziatore/process/processowner"
		},

		parse: function(response) {
			return response;
		}

	});

	return Processes;

});
