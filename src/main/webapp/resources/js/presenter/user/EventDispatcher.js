/*!
* \File: EventDispatcher.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-06-26
* \LastModified: 2014-08-31
* \Class: EventDispatcher
* \Package: com.sirius.sequenziatore.client.presenter.user
* \Brief: gestione della notifica di preserza di passi approvati o respinti;
*         estende la classe presenter.BaseDispatcher
*/
define([
 'jquery',
 'underscore',
 'presenter/BaseDispatcher',
 'model/user/collection/StepCollection'
], function( $, _, BaseDispatcher, StepCollection ) {

	// invoca il metodo notify se la collezione contiene dei nuovi passi approvati o respinti
	var intervalFunction = function( collection, options ) {
		var self = this;
		collection.fetchApproved( options ).done( function() {
			var response = collection.toJSON();
			collection.reset();
			if( response.length ) self.notify( response );
		});
	};

	var INTERVALMS = 10000;

	// eredita il prototipo della classe BaseDispatcher
	EventDispatcher.prototype = new BaseDispatcher(); // EventDispatcher.prototype = _.extend( Backbone.Events, new BaseDispatcher()  );
	EventDispatcher.prototype.constructor = EventDispatcher;

	function EventDispatcher( options ) {
		this.session = options.session;
		this.intervalId = null;
	}

	EventDispatcher.prototype.startListen = function() {
		var collection = new StepCollection();
		var options = { username: this.session.getUsername() };
		intervalFunction.call( this, collection, options  );
		var self = this;
		// invoca il metodo "intervalFunction" ogni INTERVALMS millisecondi
		this.intervalId = setInterval( function() {
			intervalFunction.call( self, collection, options );
		}, INTERVALMS);
	};

	// interrompe l'esecuzione della funzione periodica con id "intervalId"
	EventDispatcher.prototype.stopListen = function() {
		clearInterval( this.intervalId );
	};

	// notifica gli observer
	EventDispatcher.prototype.notify = function( context ) {
		for(var i=0; i<this.size(); i++){
			var observer = this.getObserver(i);
			if( typeof observer.notifyApprovedData !== 'undefined' )
				observer.notifyApprovedData( context );
		}
	};

	return EventDispatcher;

});