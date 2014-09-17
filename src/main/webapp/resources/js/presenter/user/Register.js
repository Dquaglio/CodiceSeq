/*!
* \File: Register.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-28
* \Class: Register
* \Package: com.sirius.sequenziatore.client.presenter.user
* \Brief: Gestione della logica della registrazione
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/user/registerTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, registerTemplate ){

	// PUBLIC
	var Register = Backbone.View.extend({
		
		// constructor
		initialize: function () {
			// add page to DOM
			if( $(this.id).length == 0 ) {
				var first = !$("[data-role=page]").length;
				var page = '<div data-role="page" data-title="Sequenziatore" id="register"></div>';
				$('body').append(page).enhanceWithin();
				// la prima pagina dinamicamente aggiunta deve essere inizializzata
				if(first) $.mobile.initializePage();
			}
		},

		template: _.template(registerTemplate),

		id: "#register",

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
				if( self.model.isLogged() ) location.reload();
				else {
					$("#home .alertPanel p").text("Credenziali non corrette");
					$("#home .alertPanel").popup("open");
					$("#password").val("");
				}
			});
		}

	});

	return Register;

});