/*!
* \File: LoginLogic.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-10
* \Class: LoginLogic
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Gestione della logica dell'autenticazione
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/loginTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, loginTemplate ){

	var LoginLogic = Backbone.View.extend({
		
		// constructor
		initialize: function () {
			if(typeof this.id == "undefined") this.id = "#home";
			// add page to DOM
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="'+this.id.substr(1)+'"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(loginTemplate),

		el: $('body'),

		render: function() {
			// template rendering and JQM css enhance
			$(this.id).html(this.template()).enhanceWithin();
		},
		
		events: {
			"submit #loginForm" : "login"
		},

		login: function(event) {
			event.preventDefault(); // prevent page reload on submit
			
			// begin test
			this.model.login( $("#username").val(), $("#password").val() );
			if(this.model.isLogged()) {
				location.reload();
			}
			else {
				$("#alert p").text("Credenziali non corrette");
				$("#alert").popup("open");
			}
			// end test
			
			/* management of asynchronous method "login"
			this.model.login(
				$("#username").val(),
				$("#password").val()
			).done(function() {
				location.reload();
			}).fail(function() {
				$("#alert p").text("Credenziali non corrette");
				$("#alert").popup("open");
			});
			*/
		}

	});

	return LoginLogic;

});