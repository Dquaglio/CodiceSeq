define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/homeTemplate.html',
], function( $, _, Backbone, BasePresenter, homeTemplate ){

	var MainProcessOwner = BasePresenter.extend({

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "home");
			this.render();
		},

		template: _.template(homeTemplate),
		
		id: '#home',

		el: $('body'),
		
		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		}

	});

	return MainProcessOwner;

});