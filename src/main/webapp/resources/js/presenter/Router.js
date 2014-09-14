/*!
* \File: Router.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-29
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

	// Carica un presenter associadolo alla pagina "pageId"
	var load = function( resource, pageId, async ) {
		// default value
		async = typeof async !== "undefined" ? async : false;

		var self = this;
		require([resource], function(Module) {
			var presenter = new Module({ session: self.userData });
			self.presenters[pageId] = presenter;
			// il presenter viene aggiunto alla lista degli observer del gestore delle notifiche
			addObserver.call( self, presenter );
			// il presenter necessita di recuperare dati dal server prima di essere renderizzato
			if(async) {
				// gestione del metodo asincrono "update"
				self.listenTo( presenter, "updated", function() {
					changePage(pageId);
				});
				presenter.update();
			}
			else {
				presenter.render();
				changePage(pageId);
			}
		});
	};

	// aggiunge il presenter all'oggetto eventDispatcher che gestisce le notifiche
	var addObserver = function( presenter ) {
		if( this.eventDispatcher == null ) {
			if( this.userData.isLogged() ) {
				if( this.userData.isUser() ) var resource = "presenter/user/EventDispatcher";
				else var resource = "presenter/processowner/EventDispatcher";
				var self = this;
				require([resource], function( EventDispatcher ) {
					self.eventDispatcher = new EventDispatcher();
					self.eventDispatcher.addObserver( presenter );
					self.eventDispatcher.startListen();
				});
			}
		}
		else this.eventDispatcher.addObserver( presenter );
	};

	// Cambia la pagina corrente ed effettua una transizione
	var changePage = function( pageId ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", pageId, { changeHash: false } );
	};

	var Router = Backbone.Router.extend({

		userData: new UserDataModel(),
		presenters: new Array(),
		eventDispatcher: null,

		routes: {
			"": "home",
			"home": "home",
			"newprocess": "newProcess",
			"checkstep": "checkStep",
			"processes": "processes",
			"process": "process",
			"register": "register",
			"*actions": "home"
		},

		// Backbone.Router.execute() override
		execute: function(callback, args) {
			if(callback) {
				// Controllo sessione
				if( this.userData.isLogged() ) callback.apply(this, args);
				else {
					// gestione autenticazione
					if( typeof this.presenters["#login"] === "undefined" ) {
						this.presenters["#login"] = new LoginLogic({ model: this.userData });
						this.presenters["#login"].render();
					}
					changePage("#home");
				}
			}
		},

		// Gestione degli eventi di routing

		home: function() {
			if(typeof this.presenters["#home"] == 'undefined') {
				if( this.userData.isUser() ) load.call(this,'presenter/user/MainUser',"#home");
				else load.call(this,'presenter/processowner/MainProcessOwner',"#home",true);
			}
			else this.presenters["#home"].update();
		},

		newProcess: function() {
			if(typeof this.presenters["#newprocess"] == 'undefined') {
				if( this.userData.isUser() ) window.location.replace( "#home" );
				else load.call(this,'presenter/processowner/NewProcess',"#newprocess",true);
			}
			else this.presenters["#newprocess"].update();
		},

		processes: function() {
			if(typeof this.presenters["#processes"] == 'undefined') {
				if( this.userData.isUser() ) {}
				else load.call(this,'presenter/processowner/OpenProcess',"#processes",true);
			}
			else this.presenters["#processes"].update();
		},

		checkStep: function() {
			if(typeof this.presenters["#checkstep"] == 'undefined') {
				if( this.userData.isUser() ) window.location.replace("#home");
				else load.call(this,'presenter/processowner/CheckStep',"#checkstep",true);
			}
			else this.presenters["#checkstep"].update();
		},

		process: function() {
			if(typeof this.presenters["#process"] == 'undefined') {
				if( this.userData.isUser() ) load.call(this,'presenter/user/ManageProcess',"#process",true);
				else load.call(this,'presenter/processowner/ManageProcess',"#process",true);
			}
			else this.presenters["#process"].update();
		}

	});

	return Router;

});