/*!
* \File: BasePresenter.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-28
* \Class: BasePresenter
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Fornisce funzionalità comuni per le classi del package "presenter"
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'jquerymobile'
], function( $, _, Backbone ) {

	// open options panel
	var openPanel = function() {
		var pageId = $( ":mobile-pagecontainer" ).pagecontainer("getActivePage").attr('id');
		$("#"+pageId+" > #panel").panel("open");
	};

	// open popup panels
	var openPopup = function(event) {
		event.preventDefault();
		var target = $(event.target).attr("href");
		$(target).popup('open');
	};
	
	var reloadPage = function() {
		location.reload();
	};

	var BasePresenter = Backbone.View.extend({

		session: null,

		initialize: function( options ) {
			if( typeof options !== "undefined" ) 
				this.session = options.session;
		},

		// add page whit id "pageId" to DOM
		createPage: function(pageId) {
			if($('#'+pageId).length == 0) {
				var first = !$("[data-role=page]").length;
				var page = '<div data-role="page" data-title="Sequenziatore" id="'+pageId+'"></div>';
				$('body').append(page).enhanceWithin();
				// la prima pagina dinamicamente aggiunta deve essere inizializzata
				if(first) $.mobile.initializePage();
			}
		},

		events: {
			'click #logout': 'logout',
			'click #options': openPanel,
			'click a[data-rel="popup"]': openPopup,
			'click #reloadPage': reloadPage
		},

		logout: function() {
			// clear session data
			this.session.logout();

			window.location.replace("#home");
			// la pagina viene ricaricata dal server
			window.location.reload(true);
		}

	});

	return BasePresenter;

});
