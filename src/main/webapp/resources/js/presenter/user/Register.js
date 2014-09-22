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

	// PRIVATE

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#register .alertPanel h3").text( title );
		$("#register .alertPanel p").text( content );
		$("#register .alertPanel").popup("open");
	};

	var validateDate = function( dateInput, resultDate ) {
		var date = null;
		var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec( dateInput );
		if( matches ) {
			var day = matches[1];
			var month = matches[2] - 1;
			var year = matches[3];
			date = new Date( year, month, day );
		}
		else {
			var matches = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec( dateInput );
			if( matches ) {
				var day = matches[3];
				var month = matches[2] - 1;
				var year = matches[1];
				date = new Date( year, month, day );
			}
		}
		if( date ) {
			if( date.getDate() == day && date.getMonth() == month && date.getFullYear() == year ) {
				var currentDate = new Date();
				resultDate.setTime( date.getTime() );
				if( resultDate >= currentDate ) return "La data di nascita deve essere minore della data corrente";
				else return null;
			}
			else return "Data non valida";
		}
		else return "Inserire la data nel formato gg/mm/aaaa o aaaa-mm-gg";
	};

	var validatePassword = function( password, confirmPassword ) {
		if( password !== confirmPassword ) return "la password di conferma è diversa dalla password scelta.";
		else return null;
	};

	var register = function(event) {
		// prevent page reload on submit
		event.preventDefault();
		event.stopPropagation();
		var userData = {
			name: $("#name").val().trim(),
			surname: $("#surname").val().trim(),
			username: $("#username").val().trim(),
			email: $("#email").val().trim(),
			dateOfBirth: new Date(),
			password: $("#password").val().trim(),
		};
		var error = validateDate( $("#dateOfBirth").val().trim(), userData.dateOfBirth );
		if( error ) printMessage("Errore",error);
		else {
			$.mobile.loading('show');
			this.model.register( userData ).done( function() {
				$.mobile.loading('hide');
				printMessage("Azione eseguita", "Registrazione avvenuta con successo.");
				$("#register .alertPanel").on( "popupafterclose", function() {
					window.location.assign("#home");
				});
			}).fail( function( error ) {
				$.mobile.loading('hide');
				if(error.status == 0) printMessage("Errore", "Errore di connessione.");
				else printMessage("Errore", "l'username inserito è già posseduto da un altro utente.");
				$("#password").val("");
				$("#repassword").val("");
			});
		}
	};

	var cancelRegister = function( event ) {
		event.preventDefault();
		event.stopPropagation();
		$('#registerForm')[0].reset();
		window.location.assign("#home");
	};

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
			'submit #registerForm' : register,
			'click #cancelRegister': cancelRegister,
			'click #register a[href="#home"]': cancelRegister
		}
	});

	return Register;

});