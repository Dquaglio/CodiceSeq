/*!
* \File: UserDataModel.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-10
* \Class: UserDataModel
* \Package: com.sirius.sequenziatore.client.model 
* \Brief: Gestione dei dati utente e di sessione
*/
define([
 'backbone'
], function( Backbone ){

	var UserDataModel = Backbone.Model.extend({
	
		urlRoot: 'http://localhost:8080/sequenziatore/',

		login: function(username, password) {
			// begin test
			if(username=="Sirius") {
				sessionStorage.setItem("usertype", "processowner");
				sessionStorage.setItem("username", username);
			}
			else if(username=="Vanni" || username=="Gabriele" ) {
				sessionStorage.setItem("usertype", "user");
				sessionStorage.setItem("username", username);
			}
			// end test
			
			return $.post( this.urlRoot+"login", { 
				username: username,
				password: password
			}, function(data) {
				sessionStorage.setItem("usertype", data.usertype);
				sessionStorage.setItem("username", username);
			});
		},

		isLogged: function() {
			return !Boolean(sessionStorage.getItem("usertype"));
		},
		
		isUser: function() {
			return sessionStorage.getItem("usertype")=="user";
		}

	},
	// STATIC
	{
		clearData: function() {
			sessionStorage.clear();
			localStorage.clear();
		}
	});

	return UserDataModel;

});
