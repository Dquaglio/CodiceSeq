define([
 'jquery',
 'underscore',
 'backbone',
 '../BaseView',
 'text!view/processowner/processesTemplate.html'
], function( $, _, Backbone, BaseView, processesTemplate ){

	var ProcessesView = BaseView.extend({

		initialize: function () {
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="processes"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(processesTemplate),
		
		id: '#processes',

		el: $('body'),
		
		render: function() {
			$(this.id).html(this.template()).trigger("create");
		}

	});

	return ProcessesView;

});