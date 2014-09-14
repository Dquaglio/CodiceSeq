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
 'jquery',
 'backbone'
], function( $, Backbone ) {

	// PRIVATE
	var cookie = {

		getItem : function( key ) {
			var expression = new RegExp( key+"=(\\w+)" );
			var result = expression.exec( document.cookie );
			return result ? decodeURIComponent( result[1] ) : false;
		},

		setItem : function( key, value ){
			document.cookie = key+"="+value+";path=/";
		},

		hasItem : function( key ){
			return Boolean( this.getItem(key) );
		},

		clear: function() {
			var cookies = document.cookie.split(";");
			cookies.forEach( function( cookie ) {
				var name = cookie.substr(0, cookie.indexOf("="));
				document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			});
		}

	};

	// PUBLIC
	var UserDataModel = Backbone.Model.extend({

		urlRoot: 'http://localhost:8080/sequenziatore/',

		login: function(username, password) {
			// begin test
			if( username=="Sirius" ) {
				cookie.setItem("usertype", "processowner");
				cookie.setItem("username", username);
			}
			else if( username=="Gabriele" ) {
				cookie.setItem("usertype", "user");
				cookie.setItem("username", username);
			}
			// end test
			var self = this;
			var data = { username: username, password: password };
			return $.ajax({
				type: "POST",
				url: this.urlRoot+"login",
				data: $.param( data )
			});
			return $.ajax({
				type: "POST",
				url: this.urlRoot+"login",
				data: { username: username, password: password }, // JSON.stringify()
				success: function( data ) {
					cookie.setItem( "usertype", data.usertype );
					cookie.setItem( "username", username );
				}
			});
		},

		logout: function() {
			cookie.clear();
			this.trigger("logout");
		},

		isLogged: function() {
			return cookie.hasItem("usertype");
		},

		isUser: function() {
			return cookie.getItem("usertype")=="user";
		},

		getUsername: function() {
			return cookie.getItem("username");
		}

	});

	return UserDataModel;

});