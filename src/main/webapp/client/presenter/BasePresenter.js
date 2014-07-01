define([
 'jquery',
 'underscore',
 'backbone'
], function( $, _, Backbone ){

	var BasePresenter = Backbone.View.extend({

		createPage: function(pageId) {
			if($('#'+pageId).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="'+pageId+'"></div>';
				$('body').append(page);
			};
		},

		events: {
			'click #logout': 'logout',
			'click #options': 'openPanel',
			'click a[data-rel="popup"]': 'managePopup'
		},

		logout: function() {
			sessionStorage.clear();
			localStorage.clear();
			window.location = "#home"
			location.reload();
		},
		
		openPanel: function() {
			var pageId = $( ":mobile-pagecontainer" ).pagecontainer("getActivePage").attr('id');
			$("#"+pageId+" > #panel").panel("open");
		},

		managePopup: function(event) {
			event.preventDefault();
			var target = $(event.target).attr("href");
			$(target).popup('open');
		}

	});

	return BasePresenter;

});
