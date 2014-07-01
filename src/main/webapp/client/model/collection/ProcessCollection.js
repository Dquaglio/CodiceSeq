define([
'backbone',
'model/ProcessModel'
], function( Backbone, Process ){

	var Processes = Backbone.Collection.extend({

		model: Process,
		
		url: function() {
			return "client/data/processprocessowner.json"; //"localhost:8080/sequenziatore/process/processowner"
		},

		parse: function(response) {
			if(localStorage.getItem('process')) { response.push(JSON.parse(localStorage.getItem('process'))); }
			return response;
		}

	});

	return Processes;

});
