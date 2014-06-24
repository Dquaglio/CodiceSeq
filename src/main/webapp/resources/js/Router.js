define([
'jquery',
'backbone',
'models/Session',
'views/LoginView',
'require',
'jquerymobile'
], function( $, Backbone, Session, LoginView, require ) {

	var Router = Backbone.Router.extend({

		session: new Session(),
		
		views: new Array(),

		routes: {
			"": "home",
			"home": "home",
			"newprocess": "newprocess",
			"processes": "processes",
			"*actions": "home"
		},
		
		home: function() {
			if(this.checkSession("#home")) {
				if(typeof this.views["#home"] == 'undefined') {
					if(this.session.isUser()) this.load('user/views/HomeView',"#home")
					else this.load('processowner/views/HomeView',"#home");
				}
				else this.changePage("#home");
			}
		},

		newprocess: function() {
			if(this.checkSession("#newprocess")) {
				if(typeof this.views["#newprocess"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('processowner/views/NewProcessView',"#newprocess");
				}
				else this.changePage("#newprocess");
			}
		},
		
		processes: function() {
			if(this.checkSession("#processes")) {
				if(typeof this.views["#processes"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('processowner/views/ProcessesView',"#processes");
				}
				else this.changePage("#processes");
			}
		},

		checkSession: function(pageId) {
			if(this.session.isLogged()) return true;
			else {
				var page = new LoginView({ model: this.session, id: pageId });
				this.changePage(pageId);
				return false;
			}
		},

		load: function(resource, pageId) {
			var self = this;
			require([resource], function(View) {
				self.views[pageId] = new View();
				self.changePage(pageId);
			});
		},

		changePage: function(pageId) {
			$( ":mobile-pagecontainer" ).pagecontainer( "change", pageId, { changeHash: false } );
		}
		
	});

	return Router;

});