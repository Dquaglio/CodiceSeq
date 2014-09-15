/*!
* \File: MainUser.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: MainUser
* \Package: com.sirius.sequenziatore.client.presenter.user
* \Brief: Gestione della pagina principale dell'utente base
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'model/user/collection/ProcessCollection',
 'text!view/user/mainUserTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, ProcessCollection, mainUserTemplate ) {

	var MainProcessOwner = BasePresenter.extend({

		session: null,
		
		availableProcess: null,
		runningProcess : null,

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "home");
			this.session = options.session;
			this.availableProcess = new ProcessCollection([], {
				username: this.session.getUsername() 
			});
			this.runningProcess = new ProcessCollection([], {
				username: this.session.getUsername()
			});
		},

		template: _.template(mainUserTemplate),

		id: '#home',

		el: $('body'),

		render: function( options ) {
			// default value
			var error = typeof options !== "undefined" ? options : null;
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				availableProcess: this.availableProcess.toJSON(),
				runningProcess: this.runningProcess.toJSON(),
				username: this.session.getUsername(),
				error: error,
				pprovedDataNumber: null
			})).enhanceWithin();
		},

		// aggiorna le collezioni di processi recuperando i dati dal server
		update: function() {
			var self = this;
			// fetch processi disponibili all'iscrizione
			this.availableProcess.fetch({ running: false }).done( function() {
				// fetch processi in esecuzione
				self.runningProcess.fetch({ running: true }).done( function() {
					self.render();
				}).fail( function(error) {
					if(error.status == 0) self.render({ text: "Errore di connessione" });
					else self.render({ text: error.status+" "+error.statusText });
				}).always( function() { self.trigger("updated"); });
			}).fail( function(error) {
				if(error.status == 0) self.render({ text: "Errore di connessione" });
				else self.render({ text: error.status+" "+error.statusText });
				self.trigger("updated");
			});
		}

	});

	return MainProcessOwner;

});
