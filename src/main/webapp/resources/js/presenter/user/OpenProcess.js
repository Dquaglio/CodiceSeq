/*!
 * \File: OpenProcess.js
 * \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
 * \Date: 2014-07-01
 * \LastModified:
 * \Class: OpenProcess
 * \Package: com.sirius.sequenziatore.client.presenter.user
 * \Brief: Presentazione della lista dei processi iscrivibili e iscritti in base alla richiesta dal
 *         parte dell'user
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
        },

        template: _.template(openProcessTemplate),

        id: '#processes',

        el: $('body'),

        render: function() {
            this.update();
            var address = window.location.hash;
            var exp = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
            var result = exp.exec(address);
            var type_process=null;
            if(result=="new")
                type_process="subscribable";
            else if(result="active")
                type_process="just subscribed";

            $(this.id).html(this.template({ processes: this.collection.toJSON() })).enhanceWithin();
        },

        update: function() {
            this.collection.fetch();
        }

    });

    return OpenProcess;
});