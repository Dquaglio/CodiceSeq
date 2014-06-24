define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/loginTemplate.html'
], function( $, _, Backbone, loginTemplate ){

	var LoginView = Backbone.View.extend({
		
		initialize: function () {
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="'+this.id.substr(1)+'"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(loginTemplate),

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		},
		
		events: {
			"submit #loginForm" : "login"
		},

		login: function(event) {
			event.preventDefault();
			this.model.login();
			location.reload();
		}

	});

	return LoginView;

});
