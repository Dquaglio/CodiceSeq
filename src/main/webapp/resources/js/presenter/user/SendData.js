define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendData.html',
 'model/ProcessDataCollection',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, SendDataTemplate, ProcessDataCollection ){

    var process = new ProcessDataCollection();
    var template = _.template(SendDataTemplate);

	var SendData = BasePresenter.extend({

	    //attributi


        id: '#send_data',
        el: $('body'),



        //metodi

        initialize: function () {
			this.constructor.__super__.createPage.call(this, "send_data");
			_.extend(this.events, BasePresenter.prototype.events);
		},

        render: function() {
            process.fetch();
		    $(this.id).html(template({
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
