define([
 'backbone',
 'jquery',
 'model/ProcessDataModel',
 'collection/StepCollection',
 'model/StepModel'
], function( Backbone, $, ProcessData, Steps, Step ){

	var ProcessDataCollection = Backbone.Collection.extend({

		model: ProcessData,
		/*
		fetchStepData: function(stepId) {
			if(typeof this.step === "undefined") this.step = new Step({ id: stepId });
			this.url = "js/data/stepdata"+this.step.id+".json"; //"\stepdata\{step}\processowner"
			if(this.step.id != stepId) this.step.id = stepId;
			var self = this;
			$.when(this.fetch(), this.step.fetch()).done( function() {
				self.trigger("dataFetched");
			});
		},
		*/
		fetchWaitingData: function() {
			this.url = "http://localhost:8080/sequenziatore/approvedata"//"js/data/waitingdata.json"; //"\approveData"
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
			this.url = "http://localhost:8080/sequenziatore/approvedata";
			var model = this.findWhere({
				stepId: stepId,
				username: username
			});
			var self = this;
			/*model.sync("create", {username: username, stepId: stepId, approved: true} ).done( function() {
				self.remove(model);
				window.location.replace('#checkstep');
			});*/
			console.log(stepId);
			console.log(typeof stepId);
			$.ajax({
				type:"POST",
				url: this.url,
				data:{ stepId:stepId,username:username,approved:true},
				
				error:function(a,v,c){console.log(v);
				}
			});
		},

		rejectData: function(stepId, username) {	
			this.url = "localhost:8080/sequenziatore/approveda";
			var model = this.findWhere({
				stepId: stepId,
				username: username
			});
			var self = this;
			model.baseUrl="localhost:8080/sequenziatore/approveda";
			model.save({ username: username, stepId: stepId, approved: true }).done( function() {
				self.remove(model);
				window.location.replace('#checkstep');
			});
		}
	});

	return ProcessDataCollection;

});
