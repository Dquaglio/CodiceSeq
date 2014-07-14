/*!
* \File: OpenProcess.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-11
* \Class: OpenProcess
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della ricerca e scelta di un processo
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'collection/ProcessCollection',
 'text!view/processowner/openProcessTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, Processes, openProcessTemplate ){

	var OpenProcess = BasePresenter.extend({

		collection: new Processes(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "processes");
			//this.listenTo(this.collection, 'sync', this.render);
			this.update();
		},

		template: _.template(openProcessTemplate),
		
		id: '#processes',

		el: $('body'),
		
		// template rendering and JQM css enhance
		render: function() {
			$(this.id).html(this.template({
				processes: this.collection.toJSON(),
				username: sessionStorage.getItem("username")
			})).enhanceWithin();
		},

		// aggiorna la collezione di processi "collection", recuperando i dati dal server
		update: function() {
			var self = this;
			this.collection.fetch().done( function() {
				self.render();
			});
		}

	});

	return OpenProcess;

});
