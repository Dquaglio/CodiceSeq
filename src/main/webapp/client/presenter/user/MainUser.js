define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/MainUser.html',
], function( $, _, Backbone, BasePresenter, mainUserTemplate ){

	var MainUser = BasePresenter.extend({

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "home");
			this.render();
		},

		template: _.template(mainUserTemplate),
		
		id: '#home',

		el: $('body'),
		
		render: function() {
			$(this.id).html(this.template({ username: sessionStorage.getItem("username") })).enhanceWithin();
		}

	});

	return MainUser;

});
