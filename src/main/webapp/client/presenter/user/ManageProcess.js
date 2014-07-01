define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/manageProcessTemplate.html',
 'model/ProcessModel'
], function( $, _, Backbone, BasePresenter, manageProcessTemplate, Process ){

	var ManageProcess = BasePresenter.extend({
	
		process: new Process(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.process.clear();
			this.process.steps.reset();
			this.listenTo(this.process, 'processFetched', this.render);
			
			this.update();
		},

		template: _.template(manageProcessTemplate),
		
		id: '#process',

		el: $('body'),

		events: {
			'submit #subscribeForm': 'subscribe',
		},

		render: function() {
			if(localStorage.getItem('subscribe'+this.process.id) !== null) {
				$(this.id).html(this.template({
					subscription: false,
					process: this.process.toJSON(),
					_step: this.process.steps.models[0].toJSON()
				})).enhanceWithin();
			}
			else {
				$(this.id).html(this.template({
					subscription: true,
					process: this.process.toJSON(),
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
			var processId = this.getParam("id");
			this.process.fetchProcess(processId);
		},
		
		setProcess: function() {
			this.process.id = this.processData.step.get("processId");
			var self = this;
			this.process.fetch().done( function() {
				self.render();
			})
		}, 

		subscribe: function() {
			localStorage.setItem('subscribe'+this.process.id, 'true');
			this.render();
		}

	});

	return ManageProcess;

});
