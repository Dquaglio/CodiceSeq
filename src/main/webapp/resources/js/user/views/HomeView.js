define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/user/homeTemplate.html',
], function( $, _, Backbone, homeTemplate ){

	var HomeView = Backbone.View.extend({
		
		initialize: function () {
			if($("#home").length==0) {
				var page = '<div data-role="page" id="home"></div>';
				$('body').append(page);
				$('body').trigger("create");
			}
			this.render();
		},

		template: _.template(homeTemplate),
		
		id: '#home',

		el: $('#home'),

		render: function() {
			$(this.id).html(this.template()).trigger("create");
		}

	});

	return HomeView;

});