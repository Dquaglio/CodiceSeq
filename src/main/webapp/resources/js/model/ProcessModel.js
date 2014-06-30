define([
 'backbone',
 'underscore',
 'jquery',
 'collection/StepCollection'
], function( Backbone, _, $, StepCollection ){

	var Process = Backbone.Model.extend({

		url: function() {
			return "js/data/process"+this.id+".json";
			//"localhost:8080/sequenziatore/process/{"+this.id+"}"
		},

		steps: new StepCollection(),

		fetchProcess: function(id) {
			if(this.id!=id) this.id = id;
			var self = this;
			this.fetch().done( function() {
				var stepsId = self.get("steps");
				for(var i=0; i<stepsId.length; i++) {
					self.steps.add(new self.steps.model({ id: stepsId[i] }));
				}
				$.when.apply(null, self.fetchSteps()).done( function() {
					self.trigger("processFetched");
				});
			});
		},

		fetchSteps: function() {
			var deferreds = [];
			for (i = 0; i < this.steps.models.length; i++) {
				deferreds.push( this.steps.models[i].fetch() );
			}
			return deferreds;
		}

	});

	return Process;

});