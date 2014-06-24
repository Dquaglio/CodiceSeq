define([
 'backbone',
 'model/StepModel'
], function( Backbone, Step ){

	var Steps = Backbone.Collection.extend({

		model: Step

	});

	return Steps;

});