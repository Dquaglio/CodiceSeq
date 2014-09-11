define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/MainUser.html',
    'jquerymobile'
], function( $, _, Backbone, BasePresenter, mainUserTemplate ){

    var MainUser = BasePresenter.extend({
        template : _.template(mainUserTemplate),
        id: '#home',
        el: $('body'),
        session:null,

		initialize: function (options) {
            BasePresenter.prototype.initialize.apply(this, options);
            BasePresenter.prototype.createPage.call(this, "home");
            this.session = options.session;
		},

        render: function() {
			$(this.id).html(this.template({ username: this.session.getUsername() })).enhanceWithin();
		}

	});

	return MainUser;

});
