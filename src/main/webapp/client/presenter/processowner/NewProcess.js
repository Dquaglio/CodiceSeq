define([
 'jquery',
 'underscore',
 'backbone',
 '../BaseView',
 'text!view/processowner/newProcessTemplate.html'
], function( $, _, Backbone, BaseView, newProcessTemplate ){

	var NewProcessView = BaseView.extend({

		initialize: function () {
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="newprocess"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(newProcessTemplate),
		
		id: '#newprocess',

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		}

	});

	return NewProcessView;

});