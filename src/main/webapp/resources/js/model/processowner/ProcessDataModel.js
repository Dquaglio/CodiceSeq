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
			//var state = approved ? "APPROVED" : "REJECTED";
			var state=approved;
			var dataState = {
				username: this.get("username"),
				stepId: this.get("stepId"),
				state: state
			};
			console.log(dataState.username+dataState.stepId+dataState.state);
			return $.ajax({
				type: "POST",
				url: this.url,
				data:"username=asdad&stepId=21&state=true"
			});
		}

	});

	return ProcessDataModel;

});