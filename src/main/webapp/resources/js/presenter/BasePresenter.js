/*!
* \File: BasePresenter.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-05-26
* \LastModified: 2014-07-10
* \Class: BasePresenter
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Fornisce funzionalità comuni per le classi del package "presenter"
*/
define([
 'jquery',
 'underscore',
 'backbone',
 'model/UserDataModel',
 'jquerymobile'
], function( $, _, Backbone, UserDataModel ){

	var BasePresenter = Backbone.View.extend({

		// add page whit id "pageId" to DOM
		createPage: function(pageId) {
			if($('#'+pageId).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="'+pageId+'"></div>';
				$('body').append(page);
			};
		},

		events: {
			'click #logout': 'logout',
			'click #options': 'openPanel',
			'click a[data-rel="popup"]': 'openPopup'
		},

		logout: function() {
			var userData = new UserDataModel();
			// clear session data
			userData.constructor.clearData();
			window.location = "#home";
			location.reload();
		},

		// open options panel
		openPanel: function() {
			var pageId = $( ":mobile-pagecontainer" ).pagecontainer("getActivePage").attr('id');
			$("#"+pageId+" > #panel").panel("open");
		},

		// open popup panels
		openPopup: function(event) {
			event.preventDefault();
			var target = $(event.target).attr("href");
			$(target).popup('open');
		}

	});

	return BasePresenter;

});
