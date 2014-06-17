define([
 'jquery',
 'underscore',
 'backbone'
], function( $, _, Backbone, Session ){

	var BaseView = Backbone.View.extend({

		events: {
			"click #logout": "logout",
			"click #options": "openPanel"
		},

		logout: function() {
			sessionStorage.clear();
			location.reload();
		},
		
		openPanel: function() {
			var pageId = $( ":mobile-pagecontainer" ).pagecontainer("getActivePage").attr('id');
			$("#"+pageId+" > #panel").panel("open");
		}

	});

	return BaseView;

});