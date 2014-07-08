define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendData.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendDataTemplate, Process ){

	var SendData = BasePresenter.extend({

	    //attributi

        process: new Process(),
        id: '#send_data',
        el: $('body'),
        template: _.template(SendDataTemplate),


        //metodi

        initialize: function () {
			this.constructor.__super__.createPage.call(this, "send_data");
			_.extend(this.events, BasePresenter.prototype.events);
		},

        render: function() {
		    $(this.id).html(this.template({
					            text: true,
					            position: true,
					            number: true,
                                image:true
				            })).enhanceWithin();
			},

        getData:function(){

        },

        saveData:function(){

        }

	});

	return SendData;

});
