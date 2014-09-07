/*!
* \File: BaseDispatcher.js
* \Author: Vanni Giachin <vanni.giachin@gmail.com>
* \Date: 2014-06-26
* \LastModified: 2014-08-31
* \Class: BaseDispatcher
* \Package: com.sirius.sequenziatore.client.presenter
* \Brief: Classe base per il dispatching degli eventi; implementa il pattern Observer
*/
define([
 'underscore',
 'backbone'
], function( _, Backbone  ) {

	BaseDispatcher.prototype.constructor = BaseDispatcher;

	function BaseDispatcher() {
		// observers array
		this.observerList = [];
	}

	BaseDispatcher.prototype.contains = function( observer ) {
		return _.contains( this.observerList, observer );
	};

	BaseDispatcher.prototype.size = function() {
		return this.observerList.length;
	};

	BaseDispatcher.prototype.getObserver = function( index ) {
		if( index > -1 && index < this.observerList.length ) {
			return this.observerList[index];
		}
	};

	BaseDispatcher.prototype.addObserver = function( observer ) {
		if( !this.contains(observer) )
			this.observerList.push( observer );
	};

	BaseDispatcher.prototype.removeObserver = function( observer ) {
		if( !his.contains(observer) )
			this.observerList.splice( this.observerList.indexOf( observer ), 1 );
	};

	// metodo da definire nelle sottoclassi
	BaseDispatcher.prototype.notify = function( context ) {};

	return BaseDispatcher;

});