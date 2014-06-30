define([
 'backbone',
], function( Backbone ){

	var ProcessData = Backbone.Model.extend({
		url:"localhost:8080/sequenziatore/approveda"
	});

	return ProcessData;

});