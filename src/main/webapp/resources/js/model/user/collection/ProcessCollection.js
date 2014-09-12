/*!
* \File: ProcessCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessCollection
* \Package: com.sirius.sequenziatore.client.model.collection
* \Brief: Gestione della collezione dei processi in esecuzione e a cui è possibile iscriversi
*/
define([
 'jquery',
 'backbone',
 'model/ProcessModel'
], function( $, Backbone, ProcessModel ){

	var ProcessCollection = Backbone.Collection.extend({

		initialize: function( options ) {
			this.baseUrl = "resources/js/data/user"+options.username+"processlist";
			//this.baseUrl = "http://localhost:8080/sequenziatore/user/"+options.username+"/processlist";
		},

		model: ProcessModel,

		fetch: function( options ) {
			this.url = this.baseUrl+options.running+".json";
			// this.url = this.baseUrl+"/"+options.runnign;
			return this.constructor.__super__.fetch.apply(this);
		}

	});

	return ProcessCollection;

});
/* Cosente di recuperare dal server i processi.
 * Per ora non sono divisi in iscritto/nonIscritto perché stiamo snellendo questa funzione.
 * 
 * ESEMPIO UTLIZZO
 * collection = new ProcessCollection({ username: "Gabriele" });
 * // stampa collezione in JSON su console
 *
 * // running==true : fetch processi a cui sei iscritto
 * // running==false : fetch processi a cui puoi iscriverti
 * collection.fetch({ running: true }).done( function() {
 *		console.log(collection.toJSON());
 *	});
 */
