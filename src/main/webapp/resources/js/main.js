require.config({
	paths: {

		// libraries
		jquery: 'libs/jquery-min',
		jquerymobile: 'libs/jquery.mobile-min',
		jqueryui: 'libs/jquery.ui-min',
		jquerytouch: 'libs/jquery.ui.touch.punch-min',
		gmap3: 'libs/gmap3',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone-min',
		text: 'libs/text',
		
		model: 'model',
		view: 'view',
		presenter: 'presenter'

	},
	shim: {
		backbone: {
			deps: ['jquery', 'underscore'],
		},
		jquerytouch: {
			deps: [ "jquery", "jqueryui" ]
		}
	}
});

define([
 'backbone',
 'jquery',
 'presenter/Router',
 'jquerymobile'
], function( Backbone, $, Router ){

	// jquerymobile configuration
	$.mobile.hashListeningEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.ajaxEnabled = false;
	$.mobile.pushStateEnabled = false;
	$.mobile.autoInitializePage = false;

	var router = new Router();
	Backbone.history.start();

});