define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/processowner/addStepTemplate.html',
 'jquerymobile'
], function( $, _, Backbone, addStepTemplate ) {

	// apre un popup con titolo "title" e contenuto "content"
	var printMessage = function( title, content ) {
		$("#newprocess .alertPanel h3").text( title );
		$("#newprocess .alertPanel p").text( content );
		$("#newprocess .alertPanel").popup("open");
	};

	var AddStep = Backbone.View.extend({

		template: _.template(addStepTemplate),
		
		id: '#newprocess',

		el: $('body'),

		events: {
			'change #blocksTab .checkButton': 'enableInput',
			'change #descriptionTab .checkButton': 'showInput'
		},

		render: function() {
			// template rendering and JQM css enhance
			$(this.id).html(this.template({
				username: this.session.getUsername(),
			})).enhanceWithin();
		},

		newStep: function( steps ) {
		
		}

	});

	return AddStep;

});
