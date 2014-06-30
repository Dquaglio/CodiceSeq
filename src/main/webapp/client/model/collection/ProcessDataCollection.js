define([
 'backbone',
 'jquery',
 'model/ProcessDataModel',
 'collection/StepCollection',
 'model/StepModel'
], function( Backbone, $, ProcessData, Steps, Step ){

	var ProcessDataCollection = Backbone.Collection.extend({

		model: ProcessData,
		
		fetchStepData: function(stepId) {
			if(typeof this.step === "undefined") this.step = new Step({ id: stepId });
			this.url = "client/data/stepdata"+this.step.id+".json"; //"\stepdata\{step}\processowner"
			if(this.step.id != stepId) this.step.id = stepId;
			var self = this;
			$.when(this.fetch(), this.step.fetch()).done( function() {
				self.trigger("dataFetched");
			});
		},
		
		fetchWaitingData: function() {
			this.url = "client/data/waitingdata.json"; //"\approveData"
			this.steps = new Steps();
			var self = this;
			this.fetch().done( function() {
				for (i = 0; i < self.models.length; i++) {
					var stepId = self.models[i].get("stepId");
					if(!self.get(stepId)) self.steps.add(new Step({ id: stepId }));
				}
				$.when.apply(null, self.fetchSteps()).done( function() {
					self.trigger("dataFetched");
				});
			});
		},

		fetchSteps: function() {
			var deferreds = [];
			for (i = 0; i < this.steps.models.length; i++) {
				deferreds.push( this.steps.models[i].fetch() );
			}
			return deferreds;
		},

		approveData: function(stepId, username) {	
			this.url = "Sequenziatore/approveData";
			var model = this.findWhere({
				stepId: stepId,
				userName: username
			});
			var self = this;
			model.save({ userName: username, stepId: stepId, approved: true }).done( function() {
				self.remove(model);
				window.location.replace('#checkstep');
			});
		},

		rejectData: function(stepId, username) {	
			this.url = "Sequenziatore\approveData";
			var model = this.findWhere({
				stepId: stepId,
				userName: username
			});
			var self = this;
			model.save({ userName: username, stepId: stepId, approved: true }).done( function() {
				self.remove(model);
				window.location.replace('#checkstep');
			});
		}
	});

	return ProcessDataCollection;

});
