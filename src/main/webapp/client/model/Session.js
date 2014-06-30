define([
'backbone'
], function( Backbone ){

	var Session = Backbone.Model.extend({
	
		// urlRoot: 'localhost:8080/sequenziatore/session',

		login: function(credentials) {
			/*
			this.save(credentials, {
				success: function () {
					
				}
			});
			*/
			if(credentials.username == "sirius") sessionStorage.setItem("usertype", "processowner");
			else if(credentials.username == "Gabriele") {
				sessionStorage.setItem("usertype", "user");
				sessionStorage.setItem("username", credentials.username);
			}
			else if(credentials.username == "Vanni") {
				sessionStorage.setItem("usertype", "user");
				sessionStorage.setItem("username", credentials.username);
			}
			else {
				alert("credenziali non corrette");
			}
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
