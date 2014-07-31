define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/MainUser.html'
], function( $, _, Backbone, BasePresenter, mainUserTemplate ){

    var template = _.template(mainUserTemplate);



    var MainUser = BasePresenter.extend({




		initialize: function () {
			this.constructor.__super__.createPage.call(this, "home");
			this.listenTo(this.collection, 'all', this.render);
		},


		
		id: '#home',

		el: $('body'),
		
		render: function() {
			$(this.id).html(template({ username: sessionStorage.getItem("username") })).enhanceWithin();
		}

	});

	return MainUser;

});
