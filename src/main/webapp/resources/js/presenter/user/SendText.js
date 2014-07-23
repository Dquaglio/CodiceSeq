define([
 'jquery',
 'underscore',
 'backbone',
 'presenter/BasePresenter',
 'text!view/user/SendText.html',
 'model/ProcessModel',
 'jquerymobile'
], function( $, _, Backbone, BasePresenter, sendTextTemplate, Process ){

	var SendText = BasePresenter.extend({

        //attributi

		_process: null,
        template: _.template(sendTextTemplate),
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
					$(this.id).html(this.template).enhanceWithin();
			
		},

		_getParam: function(param) {
			var hash = window.location.hash;
			var expression = new RegExp("#process\\?(\\w+=\\w+&)*"+param+"=(\\d{1,11})");
			var result = expression.exec(hash);
			return result ? result[2] : false;
		},

		_update: function() {
			var processId = this.getParam("id");
			this.process.fetchProcess(processId);
		},


		get: function(model) {
            if(typeof model == Process )
                this._process=model;
		}

	});

	return ManageProcess;

});
