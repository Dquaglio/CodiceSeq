<<<<<<< HEAD
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
  'model/UserDataModel',
 'text!view/user/Register.html',
], function( $, _, Backbone, BasePresenter, UserData, registerTemplate ){

	var Register = BasePresenter.extend({

        //attributi

        model:new UserData(),
        id: '#register',
        template: _.template(registerTemplate),
        el: $('body'),

        //metodi

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "register");
			_.extend(this.events, BasePresenter.prototype.events);
			this.render();
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
=======
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/Register.html',
], function( $, _, Backbone, BasePresenter, registerTemplate ){

	var Register = BasePresenter.extend({

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "home");
			_.extend(this.events, BasePresenter.prototype.events);
			this.render();
		},

		template: _.template(registerTemplate),
		
		id: '#home',

		el: $('body'),
		
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
>>>>>>> 5bce9192c258fd7b78c2f0bbcfe811a01948fd3a
