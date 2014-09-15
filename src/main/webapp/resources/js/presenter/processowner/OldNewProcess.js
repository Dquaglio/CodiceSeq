define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/processowner/newProcessTemplate.html',
 'model/ProcessModel',
], function( $, _, Backbone, BasePresenter, newProcessTemplate, Process ){

	var ManageProcess = BasePresenter.extend({

		model: new Process(),

		initialize: function () {
			BasePresenter.prototype.initialize.apply(this, options);
			BasePresenter.prototype.createPage.call(this, "newprocess");
			_.extend(this.events, BasePresenter.prototype.events);
			this.model.clear();
			this.model.steps.reset();
			this.render();
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'submit #processForm': 'saveProcess',
			'click #cancel': 'cancel',
			'click #scancel': 'cancel',
			'click .tabButton': 'changeTab',
			'change .checkButton': 'showInput',
			'change #numericDataCheck': 'showConstraints',
			'click #saveStep': 'newStep',
			'click #cancelStep': 'calcelStep',
		},

		render: function(errors) {
			$(this.id).html(this.template({
				errors: typeof errors !== "undefined" ? errors : null,
				process: this.model.get("name") !== "undefined" ? this.model.toJSON() : null,
				steps: this.model.steps.length ? this.model.steps.models : null
			})).enhanceWithin();
		},

		saveProcess: function(event) {
			event.preventDefault();
			this.getData();
			if(this.model.steps.length == 0) {
				alert("È richiesto l'inserimento di almeno un passo");
			}
			else {
				localStorage.setItem('process', JSON.stringify(this.model.toJSON()));
				console.log(alert("Processo salvato"));
				this.model.clear();
				this.model.steps.reset();
				$("form")[0].reset();
				this.render();
				window.location.assign("#home");
			}
		},

		newStep: function() {
			var step = new this.model.steps.model({ id: this.model.steps.length+1 });
			var data = [];
			if($("#textDataCheck").is(":checked")) {
				data.push({ type: "TEXTUAL", name: $("#textData").val() });
			}
			else if($("#numericDataCheck").is(":checked")) {
				data.push({ type: "NUMERIC", name: $("#numericData").val() });
			}
			else if($("#imageDataCheck").is(":checked")) {
				data.push({ type: "IMAGE", name: $("#imageData").val() });
			}
			var conditions = [];
			var constraints = [];
			if($("#numericConstraintsCheck").is(":checked")) {
				constraints.push({
					minDigit: $("#minDigit").val(),
					maxDigit: $("#maxDigit").val(),
					minValue: $("#minValue").val(),
					maxValue: $("#maxValue").val(),
					decimal: $("#isDecimal").is(":checked")
				});
			}
			if($("#geographicConstraintsCheck").is(":checked")) {
				constraints.push({
					latitude: $("#latitue").val(),
					longitude: $("#longitude").val(),
					radius: $("#radius").val()
				});
			}
			conditions.push({
				nextStepId: $("#nextStepSelect").val() == "standard" ? null : $("#nextStepSelect").val(),
				requiresApproval: $("#requiresApproval").is(":checked"),
				optional: $("#optional").is(":checked"),
				constraints: constraints
			});
			step.set({
				description: $("#stepDescription").val(),
				data: data,
				conditions: conditions
			});
			this.model.steps.add(step);
			this.getData();
			this.render();
			$(".mainTab").hide();
			$("#stepsDefinition").show();
		},

		calcelStep: function() {
			$(".tab, .mainTab").hide();
			$("#stepsDefinition").show();
		},

		getData: function() {
			this.model.set({
				id: 3,
				name: $("#processName").val(),
				description: $("#processDescription").val(),
				imageUrl: "Default",
			});
			if($("#dateOfTerminationCheck").is(":checked")) {
				this.model.set({
					dateOfTermination: $("#dateOfTermination").val(),
				});
				this.model.set({
					timeOfTermination: $("#timeOfTermination").val(),
				});
			}
			if($("#completionsMaxCheck").is(":checked")) {
				this.model.set({
					completionsMax: $("#completionsMax").val(),
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
			this.model.clear();
			this.model.steps.reset();
			$("form")[0].reset();
			this.render();
			window.location.assign("#home");
		},
		
		showConstraints: function() {
			$("#numericConstraintsContainer").toggle();
		}

	});

	return ManageProcess;

});
