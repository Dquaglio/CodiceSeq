define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/loginTemplate.html',
 'models/Session'
], function( $, _, Backbone, loginTemplate, Session ){

	var LoginView = Backbone.View.extend({
		
		initialize: function () {
			this.listenTo(this.model,"sync",this.reload);
			if($(this.id).length==0) {
				var id = this.id.substr(1);
				var page = '<div data-role="page" id="'+id+'"></div>';
				$('body').append(page);
				$('body').trigger("create");
			}
			this.render();
		},

		template: _.template(loginTemplate),

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).trigger("create");
		},
		
		events: {
			"click #invia" : "login",
			"keypress #password": "loginOnEnter"
		},

		loginOnEnter: function(event) {
			if(event.keyCode == 13) this.login();
		},

		login: function() {
			var creds = { "username":[{"ciao":"questouser6"},{"ciao":"questouser1"}],"password":"questapassword"};
			this.model.login(creds,this.id);
			console.log("arrivato");
		},
		reload:function(){
			Backbone.history.fragment = null;
			Backbone.history.navigate(this.id, { trigger: true });
		}

	});

	return LoginView;

});
