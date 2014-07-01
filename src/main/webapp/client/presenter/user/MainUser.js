define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/MainUser.html',
 'collection/ProcessCollection'
], function( $, _, Backbone, BasePresenter, mainUserTemplate, Processes ){

	var MainUser = BasePresenter.extend({

		collection: new Processes(),

		initialize: function () {
			this.constructor.__super__.createPage.call(this, "home");
			this.listenTo(this.collection, 'all', this.render);
			this.update();
		},

		template: _.template(mainUserTemplate),
		
		id: '#home',

		el: $('body'),
		
		render: function() {
			var models = this.collection.models;
			for(var i=0; i<models.length; i++) {
				if(localStorage.getItem('subscribe'+models[i].get("id")) !== null) {
					models[i].set({ subscribed: true });
				}
			}
			JSON.parse(localStorage.getItem('process'))
			$(this.id).html(this.template({ processes: this.collection.toJSON(), username: sessionStorage.getItem("username") })).enhanceWithin();
		},
		
		update: function() {
			this.collection.fetch();
		}

	});

	return MainUser;

});
