define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/processowner/newProcessTemplate.html',
], function( $, _, Backbone, newProcessTemplate ){

	var NewProcessView = Backbone.View.extend({

		initialize: function () {
			if($("#newprocess").length==0) {
				var page = '<div data-role="page" id="newprocess"></div>';
				$('body').append(page);
				$('body').trigger("create");
			}
			this.render();
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).trigger("create");
		}

	});

	return NewProcessView;

});