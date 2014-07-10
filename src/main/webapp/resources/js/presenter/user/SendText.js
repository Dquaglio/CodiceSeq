define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendText.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendTextTemplate, Process ){

    var SendText = BasePresenter.extend({

        //attributi
        process: new Process(),

        events: {
            'submit #sendNumberForm': 'sendText'
        },

        template: _.template(SendTextTemplate),
        id: '#send_text',
        el: $('body'),

        //metodi

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "send_text");
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

        sendText:function(){

        }

    });

    return SendText;

});
