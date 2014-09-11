/*!
* \File: LoginLogic.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-28
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

	// PUBLIC
	var LoginLogic = Backbone.View.extend({
		
		// constructor
		initialize: function () {
			// add page to DOM
			if( $(this.id).length == 0 ) {
				var first = !$("[data-role=page]").length;
				var page = '<div data-role="page" data-title="Sequenziatore" id="home"></div>';
				$('body').append(page).enhanceWithin();
				// la prima pagina dinamicamente aggiunta deve essere inizializzata
				if(first) $.mobile.initializePage();
			}
		},

		template: _.template(loginTemplate),

		id: "#home",

		el: $('body'),

		render: function() {
			// template rendering and JQM css enhance
			$(this.id).html(this.template()).enhanceWithin();
		},
		
		events: {
			"submit #loginForm" : 'login'
		},

		login: function(event) {
			// prevent page reload on submit
			event.preventDefault();
			// management of asynchronous method "login"
			var self = this;
			$.mobile.loading('show');
			this.model.login( $("#username").val(), $("#password").val() ).done( function() {
				$.mobile.loading('hide');
				if( self.model.isLogged() ) location.reload();
			}).fail(function() {
				$.mobile.loading('hide');
				// only for test
				if( self.model.isLogged() ) location.reload();
				else {
					$("#home .alertPanel p").text("Credenziali non corrette");
					$("#home .alertPanel").popup("open");
					$("#password").val("");
				}
			});
		}

	});

	return LoginLogic;

});