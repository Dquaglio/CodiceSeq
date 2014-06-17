define([
'jquery',
'backbone',
'model/Session',
'presenter/Login',
'require',
'jquerymobile'
], function( $, Backbone, Session, Login, require ) {

	var Router = Backbone.Router.extend({

		session: new Session(),
		
		views: new Array(),

		routes: {
			"": "home",
			"home": "home",
			"newprocess": "newProcess",
			"processes": "processes",
			"checkstep": "checkStep",
			"*actions": "home",
		},

		home: function() {
			if(this.checkSession("#home")) {
				if(typeof this.views["#home"] == 'undefined') {
					if(this.session.isUser()) this.load('presenter/user/MainUser',"#home");
					else this.load('presenter/processowner/MainProcessOwner',"#home");
				}
				else this.changePage("#home");
			}
		},

		newProcess: function() {
			if(this.checkSession("#newprocess")) {
				if(typeof this.views["#newprocess"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('presenter/processowner/NewProcess',"#newprocess");
				}
				else this.changePage("#newprocess");
			}
		},
		
		processes: function() {
			if(this.checkSession("#processes")) {
				if(typeof this.views["#processes"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('presenter/processowner/Processes',"#processes");
				}
				else this.changePage("#processes");
			}
		},

		checkStep: function() {
			if(this.checkSession("#checkstep")) {
				if(typeof this.views["#checkstep"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('presenter/processowner/CheckStep',"#checkstep");
				}
				else this.changePage("#checkstep");
			}
		},

		checkSession: function(pageId) {
			if(this.session.isLogged()) return true;
			else {
				var page = new Login({ model: this.session, id: pageId });
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