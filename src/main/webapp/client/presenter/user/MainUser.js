define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/user/homeTemplate.html',
], function( $, _, Backbone, homeTemplate ){

	var HomeView = Backbone.View.extend({
		
		initialize: function () {
			if($(this.id).length == 0) {
				var page = '<div data-role="page" data-title="Sequenziatore" id="home"></div>';
				$('body').append(page);
			}
			this.render();
		},

		template: _.template(homeTemplate),
		
		id: '#home',

		el: $('body'),

		render: function() {
			$(this.id).html(this.template()).enhanceWithin();
		}

	});

	return HomeView;

});