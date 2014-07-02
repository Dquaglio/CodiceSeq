define([
 'backbone',
 'underscore',
 'jquery',
 'collection/StepCollection'
], function( Backbone, _, $, StepCollection ){

	var Process = Backbone.Model.extend({

		url: function() {
			return "resources/js/data/process"+this.id+".json";
		},

		steps: new StepCollection(),

		fetchProcess: function(id) {
			this.steps.reset();
			if(this.id!=id) this.id = id;
			var self = this;
			this.fetch().done( function() {
				var stepsId = self.get("stepsId");
				for(var i=0; i<stepsId.length; i++) {
					self.steps.add(new self.steps.model({ id: stepsId[i] }));
					console.log(i);
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
