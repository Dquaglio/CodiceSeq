define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/newProcessTemplate.html',
 'collection/ProcessCollection',
 'model/ProcessModel',
], function( $, _, Backbone, BasePresenter, newProcessTemplate, Processes, Process ){

	var ManageProcess = BasePresenter.extend({

		collection: new Processes(),

		model: new Process(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "newprocess");
			_.extend(this.events, BasePresenter.prototype.events);
			this.render();
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'submit #processForm': 'saveProcess',
			'click #cancel': 'cancel',
			'click #addStep': 'newStep',
			'click .tabButton': 'changeTab',
			'change .checkButton': 'showInput',
			'change #numericDataCheck': 'showConstraints'
		},

		render: function(errors) {
			$(this.id).html(this.template({
				errors: typeof errors !== "undefined" ? errors : null,
				steps: this.model.steps.length ? null : null
			})).enhanceWithin();
		},

		saveProcess: function(event) {
			event.preventDefault();
			this.getData();
			if(this.model.steps.length == 0) {
				alert("È richiesto l'inserimento di almeno un passo");
			}
			console.log(this.model.toJSON());
		},

		newStep: function() {
			
		},

		getData: function() {
			this.model.set({
				name: $("#name").val(),
				description: $("#description").val(),
			});
			if($("#dateOfTerminationCheck").is(":checked")) {
				this.model.set({
					dateOfTermination: $("#dateOfTermination").val(),
				});
			}
			if($("#completionsMaxCheck").is(":checked")) {
				this.model.set({
					completionsMax: $("#completionsMax").val(),
				});
			}
			if($("#maxTreeCheck").is(":checked")) {
				this.model.set({
					maxTree: $("#maxTree").val(),
				});
			}
		},

		changeTab: function(event) {
			event.preventDefault();
			var targetId = $(event.target).attr("href");
			$(".tab, .mainTab").hide();
			$(targetId).show();
		},

		showInput: function(event) {
			var hideDiv = $(event.target).parent().next(".hide");
			hideDiv.toggle();
			if(hideDiv.is(":visible")) hideDiv.find("input").prop('required',true);
			else hideDiv.find("input").prop('required',false);
		},

		cancel: function() {
			$("form")[0].reset();
			$(".tab").hide();
			$(".mainTab").show(0);
			window.location.assign("#home");
		},
		
		showConstraints: function() {
			$("#numericConstraintsContainer").toggle();
		}

	});

	return ManageProcess;

});
