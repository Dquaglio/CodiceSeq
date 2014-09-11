
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
  'model/UserDataModel',
 'text!view/user/registerTemplate.html'
], function( $, _, Backbone, BasePresenter, UserData, RegisterTemplate ){




	var Register = BasePresenter.extend({
        model:new UserData(),
        template: _.template(RegisterTemplate),
        id: '#register',

        el: $('body'),

        //metodi

		initialize: function () {
            BasePresenter.prototype.initialize.apply(this, options);
            BasePresenter.prototype.createPage.call(this, "register");
		},

		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		},

		events: {
			"submit #registerForm" : "register"
		},

		register: function(event) {
			event.preventDefault();
		}

	});

	return Register;

});
