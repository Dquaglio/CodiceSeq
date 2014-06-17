define([
'backbone'
], function( Backbone ){

	var Session = Backbone.Model.extend({
	
		// urlRoot: 'localhost:8080/sequenziatore/session',

		login: function() {
			/*
			this.save(creds, {
				success: function () {
					sessionStorage.setItem("usertype", "processowner");
				}
			});
			*/
			sessionStorage.setItem("usertype", "processowner");
		},
		
		isLogged: function() {
			return Boolean(sessionStorage.getItem("usertype"));
		},
		
		isUser: function() {
			return sessionStorage.getItem("usertype")=="user";
		}

	});

	return Session;

});