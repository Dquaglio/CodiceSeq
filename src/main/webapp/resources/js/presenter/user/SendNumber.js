/*!
 * \File: SendNumber.js
 * \Author: Marcomin Gabriele <gabriele.marcomin@gmail.com>
 * \Date: 2014-06-08
 * \LastModified:
 * \Class: SendNumber
 * \Package: com.sirius.sequenziatore.client.presenter.user
 * \Brief: Gestione dell'invio dei dati numerici per la conclusione di un passo
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'presenter/BasePresenter',
    'text!view/user/SendNumber.html',
    'model/ProcessModel',
    'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendNumberTemplate, Process ){

    var SendNumber = BasePresenter.extend({

        //attributi
        process: new Process(),

        events: {
            'submit #sendNumberForm': 'sendNumber'
        },

        template: _.template(SendNumberTemplate),
        id: '#send_number',
        el: $('body'),

        //metodi

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "send_number");
            _.extend(this.events, BasePresenter.prototype.events);
        },

        render: function() {
            $(this.id).html(this.template({
                subscription: false,
                process: this.process.toJSON(),
                complete: true
            })).enhanceWithin();

        },

        getData:function(data){

        },

        sendNumber:function(){

        }

    });

    return SendNumber;

});