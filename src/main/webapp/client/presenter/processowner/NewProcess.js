define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/newProcessTemplate.html'
], function( $, _, Backbone, BasePresenter, newProcessTemplate ){

	var NewProcess = BasePresenter.extend({

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "newprocess");
			this.render();
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		}

	});

	return NewProcess;

});