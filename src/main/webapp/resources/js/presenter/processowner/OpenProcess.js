/*!
* \File: OpenProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-08-31
* \Class: OpenProcess
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della ricerca e scelta di un processo
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'collection/processowner/ProcessCollection',
 'text!view/processowner/openProcessTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, Processes, openProcessTemplate ) {

	var OpenProcess = BasePresenter.extend({

		session: null,
		collection: new Processes(),

		// constructor
		initialize: function( options ) {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "processes");
			this.session = options.session;
		},

		template: _.template(openProcessTemplate),

		id: '#processes',

		el: $('body'),

		render: function( options ) {
			// default value
			var error = typeof options !== "undefined" ? options : null;
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				processes: this.collection.toJSON(),
				username: this.session.getUsername(),
				error: error
			})).enhanceWithin();
		},

		// aggiorna la collezione di processi "collection", recuperando i dati dal server
		update: function() {
			var self = this;
			this.collection.fetch().done( function() {
				self.render({});
			}).fail( function(error) {
				if(error.status == 0) self.render({ text: "Errore di connessione" });
				else self.render({ text: error.status+" "+error.statusText });
			}).always( function() { self.trigger("updated"); });
		}

	});

	return OpenProcess;

});