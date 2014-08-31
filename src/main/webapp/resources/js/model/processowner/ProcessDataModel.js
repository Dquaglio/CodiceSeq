/*!
* \File: ProcessDataModel.js 
* \Author: Vanni Giachin <vanni.giachin@gmail.com> 
* \Date: 2014-05-26 
* \LastModified: 2014-07-22
* \Class: ProcessDataModel
* \Package: com.sirius.sequenziatore.client.model
* \Brief: Gestione dei dati inviati da un utente relativi ad un passo
*/
define([
 'backbone',
], function( Backbone ){

	var ProcessDataModel = Backbone.Model.extend({

		url: "http://localhost:8080/sequenziatore/approvedata",

		// Approva o respinge il dato
		approve: function( approved ) {
			var state = approved ? "APPROVED" : "REJECTED";
			var dataState = {
				stepId: this.get("stepId"),
				username: this.get("username"),
				state: state
			};
			return $.ajax({
				type: "POST",
				url: this.url,
				data: JSON.stringify( dataState ),
				dataType: "json",
				contentType: "application/json;charset=utf-8",
			});
		}

	});

	return ProcessDataModel;

});