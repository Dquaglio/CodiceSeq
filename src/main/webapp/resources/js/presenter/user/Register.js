
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
  'model/UserDataModel',
 'text!view/user/Register.html'
], function( $, _, Backbone, BasePresenter, UserData, RegisterTemplate ){


    var model=new UserData();
    var template= _.template(RegisterTemplate);

	var Register = BasePresenter.extend({

        id: '#register',

        el: $('body'),

        //metodi

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "register");
			_.extend(this.events, BasePresenter.prototype.events);
			this.render();
		},

		render: function() {
			$(this.id).html(template()).enhanceWithin();
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
