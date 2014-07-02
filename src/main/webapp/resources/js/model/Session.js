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
			if(credentials.username == "sirius") {
				sessionStorage.setItem("usertype", "processowner");
				location.reload();
			}
			else if(credentials.username == "Gabriele") {
				sessionStorage.setItem("usertype", "user");
				sessionStorage.setItem("username", credentials.username);
				location.reload();
			}
			else if(credentials.username == "Vanni") {
				sessionStorage.setItem("usertype", "user");
				sessionStorage.setItem("username", credentials.username);
				location.reload();
			}
			else {
				alert("credenziali non corrette");
				$("form")[0].reset();
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
