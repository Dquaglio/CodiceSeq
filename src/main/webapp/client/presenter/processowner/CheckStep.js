define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/checkStepTemplate.html',
 'collection/ProcessDataCollection',
 'collection/StepCollection'
], function( $, _, Backbone, BasePresenter, checkStepTemplate, ProcessData, Steps ){

	var ManageProcess = BasePresenter.extend({

		processData: new ProcessData(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "checkstep");
			_.extend(this.events, BasePresenter.prototype.events);
			
			this.listenTo(this.processData, 'dataFetched', this.render);
			
			this.update();
		},

		template: _.template(checkStepTemplate),
		
		id: '#checkstep',

		el: $('body'),

		events: {
			'click #approve': 'approveData',
			'click #reject': 'rejectData'
		},

		render: function() {
			if(this.getParam("stepId")) {
				var stepId =  this.getParam("stepId");
				var username = this.getParam("username");
				var data = this.processData.findWhere({
					stepId: stepId,
					username: username
				});
				$(this.id).html(this.template({
					stepData: this.processData.steps.get(stepId).toJSON(),
					processData: data.toJSON()
				})).enhanceWithin();
			}
			else {
				var steps = [];
				this.processData.steps.models.forEach( function(step) {
					steps[step.id] = step.toJSON();
				});
				$(this.id).html(this.template({
					steps: steps,
					processData: this.processData.toJSON()
				})).enhanceWithin();
			}
		},

		update: function() {
			this.processData.fetchWaitingData();
		},

		getParam: function(param) {
			var hash = window.location.hash;
			var expression = new RegExp("#checkstep\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})|"+param+"=(\\w{1,20})");
			var result = expression.exec(hash);
			return result ? ( result[3] || Number(result[2]) ) : false;
		},
		
		approveData: function() {
			this.processData.approveData(this.getParam("stepId"),this.getParam("username"));
		},

		rejectData: function() {
			this.processData.rejectData(this.getParam("stepId"),this.getParam("username"));
		}

	});

	return ManageProcess;

});