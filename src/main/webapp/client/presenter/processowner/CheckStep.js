define([
 'jquery',
 'underscore',
 'backbone',
 '../BaseView',
 'text!view/processowner/checkStepTemplate.html'
], function( $, _, Backbone, BaseView, checkStepTemplate ){

	var CheckStepView = BaseView.extend({

		initialize: function () {
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="checkstep"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(checkStepTemplate),
		
		id: '#checkstep',

		el: $('body'),
		
		render: function() {
			$(this.id).html(this.template()).trigger("create");
		}

	});

	return CheckStepView;

});