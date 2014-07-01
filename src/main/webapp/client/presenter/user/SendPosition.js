/**
 * Created by gabriele on 01/07/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/Register.html'
], function( $, _, Backbone, BasePresenter, registerTemplate ){

    var SendPosition = BasePresenter.extend({

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "home");
            _.extend(this.events, BasePresenter.prototype.events);
            this.render();
        },

        template: _.template(registerTemplate),

        id: '#home',

        el: $('body'),

        render: function() {
            $(this.id).html(this.template()).enhanceWithin();
        },

        events: {
            "submit insertPosition" : "insert"
        },

        insert: function(event) {
        }

    });

    return Register;

});