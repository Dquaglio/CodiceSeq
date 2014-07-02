define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/addStepTemplate.html'
], function( $, _, Backbone, BasePresenter, addStepTemplate ){

	var ManageProcess = BasePresenter.extend({


		initialize: function () {
			//this.constructor.__super__.createPage.call(this, "addstep");
			_.extend(this.events, BasePresenter.prototype.events);
			
			this.render();
		},

		template: _.template(addStepTemplate),
		
		id: '#addstep',

		el: $('body'),
		
		render: function(errors) {
			$(this.id).html(this.template()).enhanceWithin();
		},

		events: {
			'submit #processForm': 'saveProcess',
			'click #cancel': 'cancel',
			'click #addStep': 'newStep',
			'click .tabButton': 'changeTab',
			'change .checkButton': 'showInput',
		},

		getData: function() {
			
		}

	});

	return ManageProcess;

});