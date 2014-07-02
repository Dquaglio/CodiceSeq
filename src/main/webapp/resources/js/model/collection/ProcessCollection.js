define([
'backbone',
'model/ProcessModel'
], function( Backbone, Process ){

	var Processes = Backbone.Collection.extend({

		model: Process,
		
		url: function() {
			return "resources/js/data/processprocessowner.json";
		},

		parse: function(response) {
			if(localStorage.getItem('process')) { response.push(JSON.parse(localStorage.getItem('process'))); }
			return response;
		}

	});

	return Processes;

});
