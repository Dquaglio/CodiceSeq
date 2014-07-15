/*!
* \File: Router.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
*          Marcomin Gabriele <gabriele.marcomin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-15
* \Class: Router
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Gestisce gli eventi di routing e il caricamento dei moduli a seconda dei privilegi utente
*/
define([
 'jquery',
 'backbone',
 'model/UserDataModel',
 'presenter/LoginLogic',
 'require',
 'jquerymobile'
], function( $, Backbone, UserDataModel, LoginLogic, require ) {

	var Router = Backbone.Router.extend({

		userData: new UserDataModel(),
		
		views: new Array(),

		routes: {
			"": "home",
			"home": "home",
			"newprocess": "newProcess",
			"checkstep": "checkStep",
			"processes": "processes",
			"process": "process",
			"register":"register",
			"*actions": "home"
		},

/* =====================================================================================
 * Gestione degli eventi di routing
 * Viene renderizzata la pagina richiesta e vengono inizializzati i presenter associati,
 * a secoda dei privilegi dell'utente identificato dai dati "userData".
 * ===================================================================================== */

		home: function() {
			if(this.checkSession("#home")) {
				if(typeof this.views["#home"] == 'undefined') {
					if(this.userData.isUser()) this.load('presenter/user/MainUser',"#home");
					else this.load('presenter/processowner/MainProcessOwner',"#home");
				}
				else {
					if(this.userData.isUser()) { this.views["#home"].render(); }
					this.changePage("#home");
				}
			}
		},

		newProcess: function() {
			if(this.checkSession("#newprocess")) {
				if(typeof this.views["#newprocess"] == 'undefined') {
					if(this.userData.isUser()) {
						window.location = "#home";
						location.reload();
					}
					else this.load('presenter/processowner/NewProcess',"#newprocess");
				}
				else this.changePage("#newprocess");
			}
		},

		processes: function() {
			if(this.checkSession("#processes")) {
				if(typeof this.views["#processes"] == 'undefined') {
					if(this.userData.isUser()) {}
					else this.load('presenter/processowner/OpenProcess',"#processes");
				}
				else {
					this.views["#processes"].update();
					this.changePage("#processes");
				}
			}
		},

		checkStep: function() {
			if(this.checkSession("#checkstep")) {
				if(typeof this.views["#checkstep"] == 'undefined') {
					if(this.userData.isUser()) {
						window.location = "#home";
						location.reload();
					}
					else this.load('presenter/processowner/CheckStep',"#checkstep");
				}
				else {
					this.views["#checkstep"].render();
					this.changePage("#checkstep");
				}
			}
		},

		process: function() {
			if(this.checkSession("#process")) {
				if(typeof this.views["#process"] == 'undefined') {
					if(this.userData.isUser()) this.load('presenter/user/ManageProcess',"#process");
					else this.load('presenter/processowner/ManageProcess',"#process");
				}
				else {
					this.views["#process"].update();
					this.changePage("#process");
				}
			}
		},

/* ===================================================================================== */

		// Controllo sessione e gestione autenticazione
		checkSession: function(pageId) {
			if(this.userData.isLogged()) return true;
			else {
				var page = new LoginLogic({ model: this.userData, id: pageId });
				this.changePage(pageId);
				return false;
			}
		},

		// Crea un oggetto di tipo "resource", che identifica il modulo che consente la gestione della pagina "pageId"
		load: function(resource, pageId) {
			var self = this;
			require([resource], function(View) {
				self.views[pageId] = new View();
				self.changePage(pageId);
			});
		},

		// Cambia la pagina corrente ed effettua una transizione
		changePage: function(pageId) {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", pageId, { changeHash: false } );
		}

	});

	return Router;

});
