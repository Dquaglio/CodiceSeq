define([
 'backbone',
 'jquery',
 'model/ProcessDataModel',
 'collection/StepCollection',
 'model/StepModel'
], function( Backbone, $, ProcessData, Steps, Step ){

	var ProcessDataCollection = Backbone.Collection.extend({

		model: ProcessData,

		fetch: function(options) {
			if(options.stepId) {
				this.url = "resources/js/data/stepdata"+options.stepId+"processowner.json";
				// this.url = "http://localhost:8080/sequenziatore/stepdata/"+options.stepId+"/processowner";
			}
			else if(options.processId && options.username) {
				// this.url = "http://localhost:8080/report/"+options.username+"/"+options.processId;
			}
			return this.constructor.__super__.fetch.apply(this);
		}

		// this.url = "resources/js/data/approvedata.json";
		// this.url = "http://localhost:8080/sequenziatore/approvedata";

	});
	
	return ProcessDataCollection;

});
