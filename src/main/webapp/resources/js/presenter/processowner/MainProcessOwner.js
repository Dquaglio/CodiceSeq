/*!
* \File: MainProcessOwner.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-10
* \Class: MainProcessOwner
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: Gestione della pagina principale dell'utente Process owner
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/mainProcessOwnerTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, mainProcessOwnerTemplate ){

	var MainProcessOwner = BasePresenter.extend({

		// constructor
		initialize: function() {
			this.constructor.__super__.createPage.call(this, "home");
			this.render();
		},

		template: _.template(mainProcessOwnerTemplate),

		id: '#home',

		el: $('body'),

		// waitingDataNumber contiene il numero di passi in attesa di approvazione
		render: function( waitingDataNumber ) {
			// 0 as default value
			waitingDataNumber = typeof waitingDataNumber !== "undefined" ? waitingDataNumber : 0;

			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				username: sessionStorage.getItem("username"),
				waitingDataNumber: waitingDataNumber
			})).enhanceWithin();
		},

		notifyWaitingData: function( waitingDataNumber ) {
			this.render(waitingDataNumber);
		}

	});

	return MainProcessOwner;

});
