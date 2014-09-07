/*!
* \File: EventDispatcher.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-06-26
* \LastModified: 2014-08-31
* \Class: EventDispatcher
* \Package: com.sirius.sequenziatore.client.presenter.processowner
* \Brief: gestione della notifica di preserza di passi che richiedono approvazione;
*         estende la classe presenter.BaseDispatcher
*/
define([
 'jquery',
 'underscore',
 'presenter/BaseDispatcher',
 'collection/processowner/ProcessDataCollection'
], function( $, _, BaseDispatcher, ProcessDataCollection ) {

	// invoca il metodo notify se la collezione contiene dei nuovi passi che richiedono approvazione 
	var intervalFunction = function( collection ) {
		var self = this;
		var oldCollection = collection.clone();
		collection.fetchWaiting().done( function() {
			changed = false;
			for( var i=0; i<collection.length && !changed; i++ ) {
				var model = collection.at(i);
				if( !oldCollection.findWhere({
					stepId: model.get("stepId"),
					username: model.get("username")
				})) changed = true;
			}
			if( changed ) self.notify( collection );
		});
	};

	var INTERVALMS = 60000;

	// eredita il prototipo della classe BaseDispatcher
	EventDispatcher.prototype = new BaseDispatcher(); // EventDispatcher.prototype = _.extend( Backbone.Events, new BaseDispatcher()  );
	EventDispatcher.prototype.constructor = EventDispatcher;

	function EventDispatcher() {
		this.intervalId = null;
	}

	EventDispatcher.prototype.startListen = function() {
		var collection = new ProcessDataCollection();
		intervalFunction.call( this, collection );
		var self = this;
		// invoca il metodo "intervalFunction" ogni INTERVALMS millisecondi
		this.intervalId = setInterval( function() {
			intervalFunction.call( self, collection );
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
			if( typeof observer.notifyWaitingData !== 'undefined' )
				observer.notifyWaitingData( context );
		}
	};

	return EventDispatcher;

});