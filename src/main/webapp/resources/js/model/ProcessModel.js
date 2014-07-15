define([
 'backbone',
 'jquery',
 'collection/StepCollection'
], function( Backbone, $, StepCollection ){

	var Process = Backbone.Model.extend({

		steps: null,

		initialize: function() {
			this.steps = new StepCollection({ processId: this.id });
		},

		url: function() {
			return "resources/js/data/process"+this.id+".json";
		},
		// "http://localhost:8080/sequenziatore/process/"+this.id,

		//  Backbone.Model.fetch overriding
		fetch: function() {
			return $.when(
				// esegue il fetch dei dati del processo
				this.constructor.__super__.fetch.apply(this),

				this.getUsernameList()
			);
		},
		
		getUsernameList: function() {
			var self = this;
			//var url = "http://localhost:8080/sequenziatore/userlist/"+this.id;
			var url = "resources/js/data/userlist"+this.id+".json";
			return $.post( url, function(data) {
				self.users = data;
			});
		},
		
		terminate: function() {
			var url = "http://localhost:8080/sequenziatore/terminateprocess/"+this.id+"/processowner";
			return $.post( url, function() {
				this.set("terminated", true);
			});
		},
		
		eliminate: function() {
			return $.post(
				"http://localhost:8080/sequenziatore/deleteprocess/"+this.id+"/processowner"
			);
		}

	});

	return Process;

});
