/*!
* \File: ProcessCollection.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessCollection
* \Package: com.sirius.sequenziatore.client.model.collection.processowner
* \Brief: Gestione dei dati riguardanti la collezione di processi accessibili all'utente process owner
*/
define([
 'backbone',
 'model/processowner/ProcessModel'
], function( Backbone, ProcessModel ){

	var ProcessCollection = Backbone.Collection.extend({

		model: ProcessModel,
		
		//url: "resources/js/data/processprocessowner.json",
		url: "http://localhost:8080/sequenziatore/process/processowner",

	});

	return ProcessCollection;

});