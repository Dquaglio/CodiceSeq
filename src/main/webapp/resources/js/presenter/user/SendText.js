define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendText.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, sendTextTemplate, Process ){

    var process = null;
    var template = _.template(sendTextTemplate);

    var getParam = function(param) {
        var hash = window.location.hash;
        var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
        var result = expression.exec(hash);
        return result ? result[2] : false;
    }

    var update = function() {
        var processId = this.getParam("id");
        this.process.fetchProcess(processId);
    }


    var get = function(model) {
        if(typeof model == Process )
            this._process=model;
    }

    var SendText = BasePresenter.extend({

        //attributi


        id: '#process',
        el: $('body'),


        //metodi

        initialize: function () {
			/*this.constructor.__super__.createPage.call(this, "process");
			_.extend(this.events, BasePresenter.prototype.events);
			this.listenTo(this.process, 'processFetched', this.render);
			
			this.update();*/
		},


        events: {
			'submit #sendTextForm': 'get'
		},

		render: function() {
					$(this.id).html(template).enhanceWithin();
			
		}


	});

	return ManageProcess;

});
