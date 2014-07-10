/*!
 * \File: SendImage.js
 * \Author: Marcomin Gabriele <vanni.giachin@gmail.com>
 * \Date: 2014-05-26
 * \LastModified:
 * \Class: SendImage
 * \Package: com.sirius.sequenziatore.client.presenter
 * \Brief: Gestione dell'invio delle immagini per la conclusione di un passo
 */
define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendImage.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendImageTemplate, Process ){

	var SendImage = BasePresenter.extend({

        //attributi
		process: new Process(),

        events: {
            'submit #sendImageForm': 'sendImage'
        },

        template: _.template(SendImageTemplate),
        id: '#send_image',
        el: $('body'),

        //metodi

        initialize: function () {
            this.constructor.__super__.createPage.call(this, "send_image");
            _.extend(this.events, BasePresenter.prototype.events);
        },

		render: function() {
		    $(this.id).html(this.template({
			    subscription: false,
				process: this.process.toJSON(),
				complete: true
					})).enhanceWithin();
			
		},

        getData:function(){

        },

        sendImage:function(){

        }

	});

	return SendImage;

});
