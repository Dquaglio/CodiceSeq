define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/processowner/processesTemplate.html',
], function( $, _, Backbone, processesTemplate ){

	var ProcessesView = Backbone.View.extend({

		initialize: function () {
			if($("#processes").length==0) {
				var page = '<div data-role="page" id="processes" data-title="Sequenziatore"></div>';
				$('body').append(page);
				$('body').trigger("create");
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