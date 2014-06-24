define([
'backbone'
], function( Backbone ){

	var Session = Backbone.Model.extend({
	
		urlRoot: 'http://localhost:8080/sequenziatore/login',

		login:function(creds,pageid) {
			
			this.save({"username":"pluto","password":"12345"}, {
				success: function(model, response) {
					sessionStorage.setItem("usertype","processowner");
            },
				error: function(model, response) {
					console.log(response);
				}
			});
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
