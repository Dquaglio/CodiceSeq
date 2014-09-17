define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendImage.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, sendImageTemplate, Process ){

    var process=new Process();
    var template= _.template(sendImageTemplate);

    var getParam=function(param) {
        var hash = window.location.hash;
        var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
        var result = expression.exec(hash);
        return result ? result[2] : false;
    }

	var SendImage = Backbone.View.extend({

		initialize: function () {
		},

		id: '#process',

		el: $('body'),

		events: {
			'submit #sendImageForm': 'get'
		},

		render: function() {
            $(this.id).html(template).enhanceWithin();
			
		}



	});

	return SendImage;

});
