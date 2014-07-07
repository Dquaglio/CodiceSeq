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
			"register":"register",
			"newprocess": "newProcess",
            "send_data" :"sendData",
            "send_number" : "sendnumber",
            "send_text" : "sendText",
            "send_position" :"sendPosition",
            "send_number" : "sendNumber",
			"processes": "processes",
			"process": "process",
			"checkstep": "checkStep",
			"*actions": "home"
		},

        //funzione per la renderizzazione e routing della home
		home: function() {
			if(this.checkSession("#home")) {
				if(typeof this.views["#home"] == 'undefined') {
					if(this.session.isUser()) this.load('presenter/user/MainUser',"#home");
					else this.load('presenter/processowner/MainProcessOwner',"#home");
				}
				else {
					if(this.session.isUser()) { this.views["#home"].render(); }
					this.changePage("#home");
				}
			}
		},

		register:function() {
			if(typeof this.views["#register"] == 'undefined') {
				this.load('presenter/user/Register',"#register");
			}
			else this.changePage("#register");
		},

        //Funzioni routing parte Process Owner

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
					if(this.session.isUser()) {}
					else this.load('presenter/processowner/OpenProcess',"#processes");
				}
				else {
					this.views["#processes"].update();
					this.changePage("#processes");
				}
			}
		},

		process: function() {
			if(this.checkSession("#process")) {
				if(typeof this.views["#process"] == 'undefined') {
					if(this.session.isUser()) this.load('presenter/user/ManageProcess',"#process");
					else this.load('presenter/processowner/ManageProcess',"#process");
				}
				else {
					this.views["#process"].update();
					this.changePage("#process");
				}
			}
		},

		checkStep: function() {
			if(this.checkSession("#checkstep")) {
				if(typeof this.views["#checkstep"] == 'undefined') {
					if(this.session.isUser()) {} // inserire gestione errore url
					else this.load('presenter/processowner/CheckStep',"#checkstep");
				}
				else {
					this.views["#checkstep"].render();
					this.changePage("#checkstep");
				}
			}
		},

        //Funzioni di routing per la parte User

        sendData:function(){
            if(this.checkSession("#send_data")) {
                if(typeof this.views["#send_data"] == 'undefined')
                    this.load('presenter/user/SendData',"#send_data");
               else {
                    this.views["#send_data"].update();
                    this.changePage("#send_data");
                }
            }
        },

        sendImage:function(){
            if(this.checkSession("#send_image")) {
                if(typeof this.views["#send_image"] == 'undefined')
                    this.load('presenter/user/SendImage',"#send_image");
                else {
                    this.views["#send_image"].update();
                    this.changePage("#send_image");
                }
            }
        },

        sendText:function(){
            if(this.checkSession("#send_text")) {
                if(typeof this.views["#send_text"] == 'undefined')
                    this.load('presenter/user/SendText',"#send_text");
                else {
                    this.views["#send_text"].update();
                    this.changePage("#send_text");
                }
            }
        },

        sendPosition:function(){
            if(this.checkSession("#send_position")) {
                if(typeof this.views["#send_position"] == 'undefined')
                    this.load('presenter/user/SendPosition',"#send_position");
                else {
                    this.views["#send_position"].update();
                    this.changePage("#send_position");
                }
            }
        },

        sendNumber:function(){
            if(this.checkSession("#send_number")) {
                if(typeof this.views["#send_number"] == 'undefined')
                    this.load('presenter/user/SendNumber',"#send_number");
                else {
                    this.views["#send_number"].update();
                    this.changePage("#send_number");
                }
            }
        },

        ////////////////////////////////////////

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
			$( ":mobile-pagecontainer" ).pagecontainer( "change", pageId );
		}
		
	});

	return Router;
});
