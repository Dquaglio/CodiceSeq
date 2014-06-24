require.config({
	paths: {

		// libraries
		jquery: 'libs/jquery-min',
		jquerymobile: 'libs/jquery.mobile-min',
		underscore: 'libs/underscore-min',
		backbone: 'libs/backbone-min',
		text: 'libs/text',

		// template folder
		templates: '../templates'

	}
});

require([
'backbone',
'jquery',
'jquerymobile',
'app'
], function( Backbone, $ ){

	// jquerymobile configuration
	$.mobile.hashListeningEnabled = false;
	$.mobile.linkBindingEnabled = false;
	$.mobile.ajaxEnabled = false;
	$.mobile.pushStateEnabled = false;
	
});