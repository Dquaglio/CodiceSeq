/**
 * Created by gabriele on 01/07/14.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/OpenProcess.html',
    'collection/ProcessCollection'
], function( $, _, Backbone, BasePresenter, openProcessTemplate, Processes ){

    var OpenProcess = BasePresenter.extend({

        collection: new Processes(),

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "processes");
            this.listenTo(this.collection, 'all', this.render);
            this.update();
        },

        template: _.template(openProcessTemplate),

        id: '#processes',

        el: $('body'),

        render: function() {
            $(this.id).html(this.template({ processes: this.collection.toJSON() })).enhanceWithin();
        },

        update: function() {
            this.collection.fetch();
        }

    });

    return OpenProcess;

});