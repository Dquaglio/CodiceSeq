define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/manageProcessTemplate.html',
 'model/ProcessModel',
 'collection/ProcessDataCollection',
], function( $, _, Backbone, BasePresenter, manageProcessTemplate, Process, ProcessData ){

	var ManageProcess = BasePresenter.extend({
	
		process: new Process(),
		
		processData: null,

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			this.process.clear();
			this.process.steps.reset();
			this.listenTo(this.process, 'processFetched', this.render);
			
			this.update();
		},

		template: _.template(manageProcessTemplate),
		
		id: '#process',

		el: $('body'),
		
		render: function(voidProcess) {
			if(typeof voidProcess !== "undefined" && voidProcess) {
				$(this.id).html(this.template({
					process: this.process.toJSON(),
					steps: null,
					processData: null,
					stepData: null
				})).enhanceWithin();
			}
			else {
				$(this.id).html(this.template({
					process: this.process.toJSON(),
					steps: this.processData ? null : this.process.steps.models,
					processData: this.processData ? this.processData.toJSON() : null,
					stepData: this.processData ? this.processData.step.toJSON() : null
				})).enhanceWithin();
			}
		},

		getParam: function(param) {
			var hash = window.location.hash;
			var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
			var result = expression.exec(hash);
			return result ? result[2] : false;
		},

		update: function() {
			if(this.processData) {
				this.stopListening(this.processData);
				this.processData = null;
			}
			if(stepId = this.getParam("step")) {
				this.processData = new ProcessData();
				this.listenTo(this.processData, 'dataFetched', this.setProcess);
				this.processData.fetchStepData(stepId);
			}
			else if(processId = this.getParam("id")) {
				if(processId!=3) this.process.fetchProcess(processId);
				else this.render(true);
			}
		},
		
		setProcess: function() {
			this.process.id = this.processData.step.get("processId");
			var self = this;
			this.process.fetch().done( function() {
				self.render();
			})
		}

	});

	return ManageProcess;

});
