define([
 'jquery',
 'underscore',
 'backbone',
 'text!view/user/Register.html'
], function( $, _, Backbone, Register ){

	var Register = Backbone.View.extend({
		
		initialize: function () {
            if($(this.id).length == 0) {
                var page = '<div data-role="page" data-title="Sequenziatore" id="'+this.id.substr(1)+'"></div>';
                $('body').append(page);
            }
            this.render();
		},

		template: _.template(Register),

		el: $('body'),

		render: function() {
            $(this.id).html(this.template()).enhanceWithin();
		},
		
		events: {
			"submit #registerForm" : "register"
		},

		register: function(event) {
		}

	});

	return Register;

});
