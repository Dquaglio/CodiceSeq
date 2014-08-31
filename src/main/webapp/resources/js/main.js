require.config({
	paths: {

		// libraries
		jquery: 'libs/jquery-min',
		jquerymobile: 'libs/jquery.mobile-min',
		gmap3: 'libs/gmap3',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone-min',
		text: 'libs/text',

		// template folder
		templates: '../templates',
		
		model: 'model',
		collection: 'model/collection',
		view: 'view',
		presenter: 'presenter'

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